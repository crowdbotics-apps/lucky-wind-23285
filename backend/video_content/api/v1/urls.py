from posixpath import basename
from django.urls import path, include

from rest_framework_extensions.routers import ExtendedDefaultRouter

from .viewsets import VideoContentViewSet, VideoContentCommentViewSet

router = ExtendedDefaultRouter()

video_content_router = router.register(
    "video-content", VideoContentViewSet, basename="video_content"
)
video_content_router.register(
    r"comments",
    VideoContentCommentViewSet,
    basename="video-content-comments",
    parents_query_lookups=["video_content"],
)

urlpatterns = [
    path("", include(router.urls)),
]
