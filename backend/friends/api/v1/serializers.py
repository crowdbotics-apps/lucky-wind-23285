from rest_framework import serializers
from friends.models import Friend
from users.api.v1.serializers import UserSerializer


class FriendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friend
        fields = "__all__"
        read_only_fields = ["owner"]

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response["user"] = UserSerializer(instance.user).data
        response["owner"] = UserSerializer(instance.owner).data
        return response
