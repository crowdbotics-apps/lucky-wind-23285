from django.contrib.auth import authenticate, get_user_model
from allauth.account.models import EmailAddress
from django.core.validators import RegexValidator
from django.http import HttpRequest
from django.utils.translation import ugettext_lazy as _
from allauth.account import app_settings as allauth_settings
from allauth.account.forms import ResetPasswordForm
from allauth.utils import email_address_exists, generate_unique_username
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from rest_framework import serializers
from rest_auth.models import TokenModel
from rest_auth.serializers import PasswordResetSerializer
from home.models import HomePage, CustomText
from users.utils import phone_number_exists
from users.models import Profile, PhoneNumber, OTP

from .backends import phone_authenticate

User = get_user_model()


class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "name",
            "email",
            "password",
            "phone_number",
        )
        extra_kwargs = {
            "password": {"write_only": True, "style": {"input_type": "password"}},
            "email": {
                "required": False,
                "allow_blank": False,
            },
        }

    def _get_request(self):
        request = self.context.get("request")
        if (
            request
            and not isinstance(request, HttpRequest)
            and hasattr(request, "_request")
        ):
            request = request._request
        return request

    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if allauth_settings.UNIQUE_EMAIL:
            if email and email_address_exists(email):
                raise serializers.ValidationError(
                    _("A user is already registered with this e-mail address.")
                )
        return email

    def validate_phone_number(self, phone_number):
        phone_regex = RegexValidator(
            regex=r"^\+?1?\d{9,15}$",
            message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.",
        )
        phone_regex(phone_number)
        if phone_number and phone_number_exists(phone_number):
            raise serializers.ValidationError(
                _("A user is already registered with this phone number.")
            )
        return phone_number

    def create(self, validated_data):
        user = User(
            email=validated_data.get("email"),
            name=validated_data.get("name"),
            phone_number=validated_data.get("phone_number"),
            username=generate_unique_username(
                [validated_data.get("name"), validated_data.get("email"), "user"]
            ),
        )
        user.set_password(validated_data.get("password"))
        user.save()

        phone_number = validated_data.get("phone_number", None)
        if phone_number:
            PhoneNumber.objects.create(user=user, phone_number=phone_number)
            otp = OTP.generate_otp(number=phone_number)
            msg = f"Your phone number verification pin is {otp}"
            OTP.send_msg_twilio(phone_no=phone_number, msg=msg)

        Profile.objects.create(user=user)
        request = self._get_request()
        setup_user_email(request, user, [])
        return user

    def save(self, request=None):
        """rest_auth passes request so we must override to accept it"""
        return super().save()


class CustomTextSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomText
        fields = "__all__"


class HomePageSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomePage
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "name",
            "email",
            "phone_number",
        ]


class PasswordSerializer(PasswordResetSerializer):
    """Custom serializer for rest_auth to solve reset password error"""

    password_reset_form_class = ResetPasswordForm


class TokenSerializer(serializers.ModelSerializer):
    """
    Serializer for Token Model.
    """

    user = UserSerializer(read_only=True)

    class Meta:
        model = TokenModel
        fields = ("key", "user")


class AuthTokenSerializer(serializers.Serializer):
    email = serializers.CharField(label=_("Email"), write_only=True, required=False)
    password = serializers.CharField(
        label=_("Password"),
        style={"input_type": "password"},
        trim_whitespace=False,
        write_only=True,
        required=True,
    )
    phone_number = serializers.CharField(
        label=_("Phone number"),
        write_only=True,
        required=False,
    )
    token = serializers.CharField(label=_("Token"), read_only=True)

    def validate(self, attrs):
        phone_number = attrs.get("phone_number", None)
        email = attrs.get("email", None)
        password = attrs.get("password", None)

        if email and password:
            user = authenticate(
                request=self.context.get("request"), email=email, password=password
            )
            email_address = EmailAddress.objects.filter(email=email)

            if not user:
                msg = _("Unable to log in with provided credentials.")
                raise serializers.ValidationError(msg, code="authorization")
            email_address = email_address.first()
            if not email_address.verified:
                msg = _("Email address not verified")
                raise serializers.ValidationError(msg, code="authorization")

        elif phone_number and password:
            user = phone_authenticate(
                phone_number=phone_number,
                password=password,
            )
            phone_number = PhoneNumber.objects.filter(phone_number=phone_number)

            if not user:
                msg = _("Unable to login with provided credentials.")
                raise serializers.ValidationError(msg, code="authentication")
            phone_number = phone_number.first()
            if not phone_number.verified:
                msg = _("Phone number not verified")
                raise serializers.ValidationError(msg, code="authorization")

        else:
            msg = _('Must include "email" or "phone number and "password".')
            raise serializers.ValidationError(msg, code="authorization")

        attrs["user"] = user
        return attrs


class VerifyPhoneNumberSerializer(serializers.Serializer):
    phone_number = serializers.CharField(write_only=True)
    otp = serializers.CharField(write_only=True)

    def get_user(self, phone_number):
        try:
            user = User.objects.get(phone_number=phone_number)
            return user
        except User.DoesNotExist:
            return None

    def verify_otp(self, user, otp):
        try:
            otp = OTP.check_otp(user=user, otp=otp)
            return otp
        except OTP.DoesNotExist:
            return None

    def validate(self, attrs):
        phone_number = attrs.get("phone_number", None)
        otp = attrs.get("otp", None)

        if phone_number and otp:
            phone_number = PhoneNumber.objects.filter(phone_number=phone_number)

            if not phone_number.exists():
                msg = _("Phone number does not exist")
                raise serializers.ValidationError(msg)
            phone_number = phone_number.first()
            if phone_number.verified:
                msg = _("The provided phone number is already verified")
                raise serializers.ValidationError(msg)

            user = self.get_user(phone_number=phone_number)
            if not user:
                msg = _("User with provided phone number does not exist")
                raise serializers.ValidationError(msg)

            otp = self.verify_otp(user=user, otp=otp)
            if not otp:
                msg = _("Invalid phone number or OTP")
                raise serializers.ValidationError(msg)

            phone_number.verified = True
            phone_number.save()

        attrs["user"] = user
        return attrs
