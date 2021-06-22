from django.urls import path
from .views import home, emailconfirmed

urlpatterns = [
    path("", home, name="home"),
    path("email-confirmed/", emailconfirmed, name="email-confirmed"),
]
