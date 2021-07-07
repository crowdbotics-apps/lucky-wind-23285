from django.contrib import admin
from django.contrib.auth import admin as auth_admin
from django.contrib.auth import get_user_model

from users.models import OTP, PhoneNumber, Profile
from users.forms import UserChangeForm, UserCreationForm

User = get_user_model()


@admin.register(User)
class UserAdmin(auth_admin.UserAdmin):

    form = UserChangeForm
    add_form = UserCreationForm
    fieldsets = (
        ("User", {"fields": ("name", "phone_number")}),
    ) + auth_admin.UserAdmin.fieldsets
    list_display = ["username", "name", "phone_number", "is_superuser"]
    search_fields = ["name", "phone_number"]


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ["id", "user"]

    search_fields = ["user__name"]


@admin.register(OTP)
class OTPAdmin(admin.ModelAdmin):
    list_display = ["user", "created", "otp", "valid"]


@admin.register(PhoneNumber)
class PhoneNumberAdmin(admin.ModelAdmin):
    list_display = [
        "user",
        "phone_number",
        "verified",
        "created",
        "modified",
    ]

    search_fields = [
        "user__name",
        "user__email",
        "user__phone_number",
    ]
