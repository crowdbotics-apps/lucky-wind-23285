# Generated by Django 2.2.24 on 2021-06-29 18:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_auto_20210629_1759'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='bio',
            field=models.CharField(blank=True, max_length=250, null=True, verbose_name='Bio'),
        ),
    ]