# Generated by Django 4.2.4 on 2023-10-15 09:17

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('employeeApp', '0005_alter_department_dept_name_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='logtiming',
            name='date',
            field=models.DateField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='logtiming',
            name='login_timing',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='logtiming',
            name='logout_timing',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]
