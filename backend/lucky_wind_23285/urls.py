"""lucky_wind_23285 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from allauth.account.views import confirm_email
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from home.api.v1.viewsets import FacebookLogin

urlpatterns = [
    path("", include("home.urls")),
    path("accounts/", include("allauth.urls")),
    # path("api/v1/", include("home.api.v1.urls")),
    re_path(r"admin/?", admin.site.urls),
    path("api/v1/auth/", include("rest_auth.urls")),
    # Override email confirm to use allauth's HTML view instead of rest_auth's API view
    path("api/v1/auth/registration/account-confirm-email/<str:key>/", confirm_email),
    path("api/v1/auth/registration/", include("rest_auth.registration.urls")),
    path("api/v1/auth/facebook/", FacebookLogin.as_view(), name="fb_login"),
    path("api/v1/users/", include("users.api.v1.urls")),
    path("api/v1/", include("friends.api.v1.urls")),
    # path("home/", include("home.urls")),
]

admin.site.site_header = "Lucky Wind"
admin.site.site_title = "Lucky Wind Admin Portal"
admin.site.index_title = "Lucky Wind Admin"

# swagger
api_info = openapi.Info(
    title="Lucky Wind API",
    default_version="v1",
    description="API documentation for Lucky Wind App",
)

schema_view = get_schema_view(
    api_info,
    public=True,
    permission_classes=(permissions.IsAuthenticated,),
)

urlpatterns += [
    path("api/docs/", schema_view.with_ui("swagger", cache_timeout=0), name="api_docs")
]
