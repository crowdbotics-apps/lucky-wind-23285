from django.shortcuts import get_object_or_404
from rest_framework import viewsets

from video_content.api.v1.serializers import (
    VideoContentCommentSerializer,
    VideoContentSerializer,
)
from video_content.models import VideoContent, VideoContentComment


class VideoContentViewSet(viewsets.ModelViewSet):
    serializer_class = VideoContentSerializer
    queryset = VideoContent.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class VideoContentCommentViewSet(viewsets.ModelViewSet):
    serializer_class = VideoContentCommentSerializer
    queryset = VideoContentComment.objects.all()

    def perform_create(self, serializer):
        user = self.request.user
        video_content = get_object_or_404(
            VideoContent, pk=self.kwargs.get("parent_lookup_video_content")
        )
        serializer.save(user=user, video_content=video_content)
