from django.db import models
from django.utils.translation import ugettext_lazy as _
from django_extensions.db.models import TimeStampedModel


class Friend(TimeStampedModel):
    owner = models.ForeignKey(
        "users.User",
        verbose_name=_("Owner"),
        related_name="friend_owner",
        on_delete=models.CASCADE,
    )
    user = models.ForeignKey(
        "users.User",
        verbose_name=_("User"),
        related_name="friend_user",
        on_delete=models.CASCADE,
    )

    class Meta:
        verbose_name = _("Friend")
        verbose_name_plural = _("Friends")

    def __str__(self):
        return self.user.name
