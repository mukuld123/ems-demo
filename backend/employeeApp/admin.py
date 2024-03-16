from django.contrib import admin

from .models import Department, Employee, Reimbursement, Role, LoginUser, Leaves, LogTiming

# Register your models here.
admin.site.register(Department)
admin.site.register(Role)

admin.site.register(Reimbursement)
admin.site.register(LoginUser)
@admin.register(Employee)

class EmployeeModelAdmin(admin.ModelAdmin):
    class Meta:
        model = Employee
        fields = ['emp_id']
admin.site.register(Leaves)
admin.site.register(LogTiming)