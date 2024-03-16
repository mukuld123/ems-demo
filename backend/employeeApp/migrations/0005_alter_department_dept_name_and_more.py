# Generated by Django 4.2.4 on 2023-10-14 21:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('employeeApp', '0004_alter_loginuser_emp_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='department',
            name='dept_name',
            field=models.CharField(blank=True, max_length=20),
        ),
        migrations.AlterField(
            model_name='department',
            name='description',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AlterField(
            model_name='role',
            name='role_description',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AlterField(
            model_name='role',
            name='role_level',
            field=models.CharField(blank=True, max_length=20),
        ),
        migrations.AlterField(
            model_name='role',
            name='role_title',
            field=models.CharField(blank=True, max_length=20),
        ),
        migrations.CreateModel(
            name='LogTiming',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('login_timings', models.CharField(max_length=2000)),
                ('emp_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='time_for', to='employeeApp.employee')),
            ],
        ),
        migrations.CreateModel(
            name='Leaves',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('leave_dates', models.CharField(max_length=1000)),
                ('leave_reason', models.CharField(max_length=200)),
                ('emp_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='leave_for', to='employeeApp.employee')),
            ],
        ),
    ]