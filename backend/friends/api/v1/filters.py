from django.db import models
from django_filters import FilterSet, filters

from friends.models import Friend


class FriendFilter(FilterSet):
    user = filters.CharFilter(
        field_name="user__name", label="user", lookup_expr="icontains"
    )

    class Meta:
        model = Friend
        fields = ["user"]
