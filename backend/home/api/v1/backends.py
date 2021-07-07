from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import User

User = get_user_model()


def phone_authenticate(phone_number=None, password=None):
    try:
        user = User.objects.get(phone_number=phone_number)
        if user.check_password(password):
            return user
        else:
            return None
    except User.DoesNotExist:
        return None
