# Generated by Django 4.2.4 on 2023-10-15 09:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('employeeApp', '0006_logtiming_date_logtiming_login_timing_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='logtiming',
            name='login_timings',
        ),
    ]
