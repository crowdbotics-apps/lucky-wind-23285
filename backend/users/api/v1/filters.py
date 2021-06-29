from django_filters import FilterSet, filters


from users.models import User


class UserFilter(FilterSet):
    name = filters.CharFilter(field_name="name", label="name", lookup_expr="icontains")

    class Meta:
        model = User
        fields = []
