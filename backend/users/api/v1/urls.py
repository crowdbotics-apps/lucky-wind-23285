from django.urls import path, include
from rest_framework.routers import DefaultRouter
from users.api.v1 import viewsets

router = DefaultRouter()
router.register("list", viewsets.UserListViewSet, basename="users")

urlpatterns = [
    path("", include(router.urls)),
    path("user/", viewsets.UserDetailView.as_view(), name="user_details"),
    path("profile/me/", viewsets.ProfileAPIView.as_view(), name="profile_edit"),
]
