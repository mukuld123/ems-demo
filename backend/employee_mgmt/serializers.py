from rest_framework import serializers
from employeeApp.models import Employee, Department, Role, Reimbursement, LoginUser, Leaves, LogTiming
from django.contrib.auth.models import User
class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'

# class AccountSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Account
#         fields = ['acc_no', 'ifsc_code', 'bank_name']


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['dept_name', 'description']


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['role_title', 'role_level', 'role_description']


class ReimbursementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reimbursement
        fields = ['emp_id', 'ticket_status', 'ticket_amount', 'ticket_reason', 'date_raised', 'date_passed']

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoginUser
        fields = ['emp_id', 'password']

class LeavesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leaves
        fields = '__all__'

class LogTimingSerializer(serializers.ModelSerializer):
    class Meta:
        model = LogTiming
        fields = '__all__'

class ManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
