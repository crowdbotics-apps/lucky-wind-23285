from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import HomePageViewSet, CustomTextViewSet

from home.api.v1.viewsets import (
    SignupViewSet,
    LoginView,
    HomePageViewSet,
    CustomTextViewSet,
    VerifyPhoneNumberView,
)

router = DefaultRouter()
router.register("signup", SignupViewSet, basename="signup")
router.register("customtext", CustomTextViewSet)
router.register("homepage", HomePageViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("login/", LoginView.as_view(), name="login"),
    path(
        "verify-phone-number/",
        VerifyPhoneNumberView.as_view(),
        name="verify-phone-number",
    ),
]
