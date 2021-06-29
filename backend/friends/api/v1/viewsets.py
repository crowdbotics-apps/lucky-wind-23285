from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend

from friends.api.v1.serializers import FriendSerializer
from friends.models import Friend
from friends.api.v1.filters import FriendFilter


class FriendViewSet(ModelViewSet):
    serializer_class = FriendSerializer
    queryset = Friend.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = FriendFilter

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        return self.request.user.friend_owner.all()
