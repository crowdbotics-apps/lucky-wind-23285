from django.contrib.auth import get_user_model
from users.models import PhoneNumber

User = get_user_model()


def phone_number_exists(number):

    phonenumbers = PhoneNumber.objects

    ret = phonenumbers.filter(phone_number__iexact=number).exists()
    if not ret:
        users = User.objects

        ret = users.filter(phone_number__iexact=number).exists()
    return ret
