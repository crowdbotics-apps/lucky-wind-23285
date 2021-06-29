from django.contrib.auth import get_user_model
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.generics import UpdateAPIView, RetrieveUpdateAPIView
from users.models import Profile, User
from users.api.v1.serializers import ProfileSerializer, UserSerializer
from users.api.v1.filters import UserFilter


class UserListViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.active()
    filter_backends = [DjangoFilterBackend]
    filterset_class = UserFilter


class ProfileAPIView(UpdateAPIView):
    """Update profile of user"""

    serializer_class = ProfileSerializer

    def get_object(self):
        try:
            return self.request.user.profile
        except Profile.DoesNotExist:
            return None


class UserDetailView(RetrieveUpdateAPIView):
    """
    Reads and updates UserModel fields
    """

    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

    def get_queryset(self):
        return get_user_model().objects.none()