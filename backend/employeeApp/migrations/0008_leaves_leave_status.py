# Generated by Django 4.2.4 on 2023-10-16 22:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employeeApp', '0007_remove_logtiming_login_timings'),
    ]

    operations = [
        migrations.AddField(
            model_name='leaves',
            name='leave_status',
            field=models.CharField(default='Applied', max_length=20),
        ),
    ]