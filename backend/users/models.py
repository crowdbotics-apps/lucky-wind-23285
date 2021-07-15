import random
import string

from django.contrib.auth.models import AbstractUser, UserManager as DjangoUserManager
from django.db import models
from django.urls import reverse
from django.utils import timezone
from django.conf import settings
from django.utils.translation import ugettext_lazy as _
from django.core.exceptions import ObjectDoesNotExist
from django_extensions.db.models import TimeStampedModel

from twilio.rest import Client

from home.utils import get_upload_path


class UserManager(DjangoUserManager):
    def active(self):
        return self.filter(is_active=True)


class User(AbstractUser):
    # WARNING!
    """
    Some officially supported features of Crowdbotics Dashboard depend on the initial
    state of this User model (Such as the creation of superusers using the CLI
    or password reset in the dashboard). Changing, extending, or modifying this model
    may lead to unexpected bugs and or behaviors in the automated flows provided
    by Crowdbotics. Change it at your own risk.
    """
    name = models.CharField(
        null=True,
        blank=True,
        max_length=255,
    )
    first_name = models.CharField(
        null=True,
        blank=True,
        max_length=255,
    )
    last_name = models.CharField(
        null=True,
        blank=True,
        max_length=255,
    )
    email = models.EmailField(
        null=True,
        blank=True,
        max_length=255,
    )
    timestamp_created = models.DateTimeField(
        null=True,
        blank=True,
        auto_now_add=True,
    )
    last_updated = models.DateTimeField(
        null=True,
        blank=True,
        auto_now=True,
    )

    phone_number = models.CharField(
        _("Phone number"),
        max_length=17,
        null=True,
        blank=True,
    )

    objects = UserManager()

    def get_absolute_url(self):
        return reverse("users:detail", kwargs={"username": self.username})


class Profile(TimeStampedModel):
    user = models.OneToOneField(
        "users.User",
        verbose_name=_("User"),
        related_name="profile",
        on_delete=models.CASCADE,
    )

    profile_picture = models.FileField(
        _("Profile Picture"),
        upload_to=get_upload_path,
        blank=True,
        null=True,
    )
    bio = models.CharField(
        _("Bio"),
        max_length=250,
        null=True,
        blank=True,
    )

    class Meta:
        verbose_name = _("Profile")
        verbose_name_plural = _("Profiles")

    def __str__(self):
        return self.user.name or self.user.email


class PhoneNumber(TimeStampedModel):
    user = models.ForeignKey(
        "users.User",
        verbose_name=_("User"),
        on_delete=models.CASCADE,
    )
    phone_number = models.CharField(
        _("Phone number"),
        max_length=17,
        null=True,
        blank=True,
    )
    verified = models.BooleanField(verbose_name=_("verified"), default=False)

    class Meta:
        verbose_name = _("Phone Number")
        verbose_name_plural = _("Phone Numbers")

    def __str__(self):
        return self.phone_number


class OTP(models.Model):
    """
    Model containing OTP values for each user
    """

    user = models.OneToOneField(
        "users.User",
        related_name="user_otp",
        verbose_name=_("User"),
        on_delete=models.CASCADE,
    )
    created = models.DateTimeField(auto_now=True)
    otp = models.CharField(max_length=10)
    valid = models.BooleanField(default=True)

    @staticmethod
    def check_otp(user, otp):
        """Check if OTP is valid for a user"""
        try:
            otp_obj = OTP.objects.get(user=user)
        except ObjectDoesNotExist:
            return False

        utc_now = timezone.now()
        if not otp_obj.valid:
            return False

        # Invalidate token
        otp_obj.valid = False
        otp_obj.save()
        return otp_obj.otp == otp

    @staticmethod
    def generate_otp(number, otp_len=6):
        """Generate OTP for a phone number given length of OTP"""

        try:
            user = User.objects.get(phone_number=number)
        except ObjectDoesNotExist:
            return None

        try:
            otp_model = OTP.objects.get(user=user)
        except ObjectDoesNotExist:
            otp_model = OTP(user=user)
        otp_model.otp = "".join(random.choice(string.digits) for _ in range(otp_len))
        otp_model.valid = True
        otp_model.save()
        return otp_model.otp

    @staticmethod
    def send_msg_twilio(phone_no, msg):
        """
        Send a custom message to a given phone number using Twilio service
        Throws a TwilioRestException if the message couldn't be sent
        """

        client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)

        message = client.messages.create(
            body=msg, to=phone_no, from_=settings.TWILIO_NUMBER
        )
