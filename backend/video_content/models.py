from django.db import models
from django_extensions.db.models import TimeStampedModel
from django.utils.translation import ugettext_lazy as _

from home.utils import get_upload_path


class VideoContent(TimeStampedModel):
    user = models.ForeignKey(
        "users.User",
        verbose_name=_("User"),
        on_delete=models.CASCADE,
        related_name="user_video_content",
    )
    description = models.CharField(
        _("Description"),
        max_length=250,
        blank=True,
        null=True,
    )
    video = models.FileField(_("Video"), upload_to=get_upload_path)

    class Meta:
        verbose_name = _("VideoContent")
        verbose_name_plural = _("VideoContents")

    def __str__(self):
        return self.user.name or self.user.email


class VideoContentComment(TimeStampedModel):
    video = models.FileField(_("Video"), upload_to=get_upload_path)
    user = models.ForeignKey(
        "users.User",
        verbose_name=_("User"),
        on_delete=models.CASCADE,
        related_name="user_video_content_comments",
    )
    video_content = models.ForeignKey(
        "video_content.VideoContent",
        verbose_name=_("Vodeo Content"),
        on_delete=models.CASCADE,
        related_name="video_content_comments",
    )

    class Meta:
        verbose_name = _("Video Content Comment")
        verbose_name_plural = _("Video Content Comments")

    def __str__(self):
        return self.user.name or self.user.email
