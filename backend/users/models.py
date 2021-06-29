from django.contrib.auth.models import AbstractUser, UserManager as DjangoUserManager
from django.db import models
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _
from django_extensions.db.models import TimeStampedModel

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
    phone_number = models.CharField(
        _("Phone number"),
        max_length=17,
        null=True,
        blank=True,
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
