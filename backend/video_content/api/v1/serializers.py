from rest_framework import serializers
from video_content.models import VideoContent, VideoContentComment
from users.api.v1.serializers import UserSerializer


class VideoContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoContent
        fields = "__all__"
        read_only_fields = ["user"]

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response["user"] = UserSerializer(instance.user).data
        return response


class VideoContentCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoContentComment
        fields = "__all__"
        read_only_fields = ["video_content", "user"]
