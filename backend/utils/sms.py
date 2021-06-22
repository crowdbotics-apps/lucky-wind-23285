import datetime
from twilio.rest import Client
from django.conf import settings
from utils.phone_number_pin import generate_pin


def send_sms(phone_number):
    pin = generate_pin(phone_number)
    client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
    client.messages.create(
        to=str(phone_number),
        from_=settings.TWILIO_NUMBER,
        body=f"Your phone number verification pin is {pin}",
    )
