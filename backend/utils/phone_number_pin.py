import redis
import random

r = redis.StrictRedis(host="redis", port=6379, db=0)


def generate_pin(phone_number):
    pin = random.randint(999, 9999)
    r.set(phone_number, pin)
    r.expire(phone_number, 172800)

    return pin


def validate_pin(phone_number, pin):
    if r.exists(phone_number):
        r_pin = r.get(phone_number)
        if r_pin == pin:
            r.delete()
            return True
        return False
