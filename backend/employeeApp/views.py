import io
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Employee, Department, Role, Reimbursement, LoginUser, Leaves, LogTiming
from employee_mgmt.serializers import EmployeeSerializer, DepartmentSerializer,  RoleSerializer, ReimbursementSerializer, LoginSerializer, LeavesSerializer, LogTimingSerializer, ManagerSerializer
# from rest_framework.parsers import JSONParser
# from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
# from django.contrib.auth.hashers import make_password, check_password
import crypt
from django.contrib.auth.models import User, Group

from django.contrib.auth import authenticate
from datetime import datetime

# Create your views here.


def HomePage(request):
    return JsonResponse({'hello':'hello'})


# class EmployeeListCreate(ListCreateAPIView):
#     queryset = Employee.objects.all()
#     serializer_class = EmployeeSerializer

# class EmployeeReadUpdateDelete(RetrieveUpdateDestroyAPIView):
#     queryset = Employee.objects.all()
#     serializer_class = EmployeeSerializer

class EmployeeAPI(APIView):
    def get(self, request, id=None, format=None):
        # id = pk
        if id is not None:
            emp = Employee.objects.get(emp_id=id)
            serializer = EmployeeSerializer(emp)
            return Response(serializer.data)
        
        emp = Employee.objects.all()
        serializer = EmployeeSerializer(emp, many=True)
        return Response(serializer.data)

    def post(self, request, id=None, format=None):
        if id is not None:
            id = id
            # print(id)
            form_data = request.data
            # print(form_data['role_id'])
            role_obj = Role.objects.get(role_title=form_data['role_id'])
            form_data['role_id'] = role_obj.id
            dept_obj = Department.objects.get(dept_name=form_data['dept_id'])
            form_data['dept_id'] = dept_obj.id

            emp = Employee.objects.get(emp_id = id)
            serializer = EmployeeSerializer(emp, data=form_data)
            if serializer.is_valid():
                serializer.save()
                return Response({'msg':'Data updated'})
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        form_data = request.data
        # print(form_data['role_id'])
        role_obj = Role.objects.get(role_title=form_data['role_id'])
        form_data['role_id'] = role_obj.id
        dept_obj = Department.objects.get(dept_name=form_data['dept_id'])
        form_data['dept_id'] = dept_obj.id
        
        serializer = EmployeeSerializer(data = form_data)
        if serializer.is_valid():
            print(request.data)
            serializer.save()
            return HttpResponse({'msg':'data created'}, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, id, format=None):
        id = id
        # print(id)
        form_data = request.data
        # print(form_data['role_id'])
        role_obj = Role.objects.get(role_title=form_data['role_id'])
        form_data['role_id'] = role_obj.id
        dept_obj = Department.objects.get(dept_name=form_data['dept_id'])
        form_data['dept_id'] = dept_obj.id

        emp = Employee.objects.get(emp_id = id)
        serializer = EmployeeSerializer(emp, data=form_data)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg':'Data updated'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# class AccountListCreate(ListCreateAPIView):
#     queryset = Account.objects.all()
#     serializer_class = AccountSerializer

# class AccountReadUpdateDelete(RetrieveUpdateDestroyAPIView):
#     queryset = Account.objects.all()
#     serializer_class = AccountSerializer


class DepartmentListCreate(ListCreateAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

class DepartmentReadUpdateDelete(RetrieveUpdateDestroyAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer




class RoleListCreate(ListCreateAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer

class RoleReadUpdateDelete(RetrieveUpdateDestroyAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer


# class ReimbursementListCreate(ListCreateAPIView):
#     queryset = Reimbursement.objects.all()
#     serializer_class = ReimbursementSerializer

# class ReimbursementReadUpdateDelete(RetrieveUpdateDestroyAPIView):
#     queryset = Reimbursement.objects.all()
#     serializer_class = ReimbursementSerializer

class ReimbursementAPI(APIView):
    def get(self, request, id=None, format=None):
        # id = pk
        real_id = Employee.objects.get(emp_id=id)
        if id is not None:
            rmb = Reimbursement.objects.filter(emp_id=real_id)
            serializer = ReimbursementSerializer(rmb,many=True)
            return Response(serializer.data)
        
        rmb = Reimbursement.objects.all()
        serializer = ReimbursementSerializer(rmb, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        form_data = request.data
        # print(form_data['role_id'])
        rmb_obj = Employee.objects.get(emp_id=form_data['emp_id'])
        form_data['emp_id'] = rmb_obj.id
        
        serializer = ReimbursementSerializer(data = form_data)
        if serializer.is_valid():
            print(request.data)
            serializer.save()
            return HttpResponse({'msg':'data created'}, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

class RegisterAPI(APIView):
    # def post(self, request, format=None):
        
    #     form_data = request.data
    #     # form_data['password'] = make_password(form_data['password'])
    #     form_data['password'] = crypt.crypt(form_data['password'])
    #     # emp = LoginUser.objects.get(emp_id = id)
    #     serializer = LoginSerializer(data=form_data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response({'msg':'registered'})
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, format=None):
        
        form_data = request.data
        print('data', form_data)
        user = User.objects.create_user(username=form_data['emp_id'],first_name=form_data['emp_fname'], last_name=form_data['emp_lname'],password=form_data['password'])
        user.save()
        return Response({'msg':'registered'})


        # form_data['password'] = crypt.crypt(form_data['password'])
        # # emp = LoginUser.objects.get(emp_id = id)
        # serializer = LoginSerializer(data=form_data)
        # if serializer.is_valid():
        #     serializer.save()
        #     return Response({'msg':'registered'})
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginAPI(APIView):
    # def post(self, request, format=None):
        
    #     form_data = request.data
        
    #     # print(form_data)
    #     emp = LoginUser.objects.get(emp_id = form_data['emp_id'])
    #     print(emp)
    #     serializer = LoginSerializer(emp, data=form_data)
    #     if serializer.is_valid():
    #         # serializer.save()
    #         # print(emp.password)
    #         # password_hash = crypt.crypt(form_data['password'])

    #         # encryptedpassword=make_password(form_data['password'])
    #         # print(check_password(emp.password, encryptedpassword))
    #         # print(check_password(make_password('hello'),make_password('hello')))
    #         # print(crypt.crypt(emp.password, password_hash), password_hash)
    #         if(crypt.crypt(form_data['password'], emp.password) == emp.password):
    #             print('done')
    #             return Response({'msg':'successful'})
    #         else:
    #             return Response({'msg': 'incorrect password'})
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, format=None):
        
        form_data = request.data
        
        # print(form_data)
        
        user = authenticate(username=form_data['emp_id'], password=form_data['password'])
        if user is not None:
            return Response({'msg':'successful'})
        else:
            return Response({'msg': 'incorrect credentials'})



class LeavesAPI(APIView):
    def get(self, request, id=None, format=None):
        # id = pk
        if id is not None:
            real_id = Employee.objects.get(emp_id=id)
            lv = Leaves.objects.filter(emp_id=real_id)
            serializer = LeavesSerializer(lv,many=True)
            return Response(serializer.data)
        
        lv = Leaves.objects.all()
        serializer = LeavesSerializer(lv, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        form_data = request.data
        print(form_data)
        # return Response('hi')
        form_data['leave_dates'] = str(form_data['leave_dates'])[1:-1]
        lv_obj = Employee.objects.get(emp_id=form_data['emp_id'])
        form_data['emp_id'] = lv_obj.id
        
        serializer = LeavesSerializer(data = form_data)
        # print(form_data)
        if serializer.is_valid():
            # print(request.data)
            serializer.save()
            return HttpResponse({'msg':'data created'}, status = status.HTTP_201_CREATED)
        # print(serializer.errors)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

    def put(self, request,id, format=None):
        form_data = request.data
        print(form_data)
        # return Response('hi')
        # form_data['leave_dates'] = str(form_data['leave_dates'])[1:-1]
        lv_obj = Leaves.objects.get(id=form_data['id'])
        # form_data['emp_id'] = lv_obj.id
        lv_obj.leave_status= form_data['leave_status']
        lv_obj.save()
        return HttpResponse({'msg':'data created'}, status = status.HTTP_201_CREATED)
    
        # serializer = LeavesSerializer(data = lv_obj)
        # # print(form_data)
        # if serializer.is_valid():
        #     # print(request.data)
        #     serializer.save()
        #     return HttpResponse({'msg':'data created'}, status = status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)


class LogAPI(APIView):
    def get(self, request, id=None, format=None):
        # id = pk
        if id is not None:
            real_id = Employee.objects.get(emp_id=id)
            lv = LogTiming.objects.filter(emp_id=real_id)
            serializer = LogTimingSerializer(lv,many=True)
            return Response(serializer.data)
        
        lv = LogTiming.objects.all()
        serializer = LogTimingSerializer(lv, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        form_data = request.data
        form_data['date'] = datetime.now().date()
        log_obj = Employee.objects.get(emp_id=form_data['emp_id'])
        form_data['emp_id'] = log_obj.id
        
        serializer = LogTimingSerializer(data = form_data)
        if serializer.is_valid():
            serializer.save()
            return HttpResponse({'msg':'data created'}, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

class GroupDetails(APIView):
    def post(self, request, format=None):
        form_data = request.data
        emp_id = form_data['emp_id']
        real_obj = Employee.objects.get(emp_id=form_data['emp_id'])
        form_data['emp_id'] = real_obj.id
        
        user = User.objects.filter(username=emp_id)[0]
        if(len(user.groups.all())>0):
            role_name = user.groups.all()[0].name 
        else:
            role_name = ''
        can_edit = True if (role_name=='manager' or role_name=='admin' or role_name=='lead') else False
        
        return Response({
            'role': role_name,
            'can_edit': can_edit
        })
    

class ManagerList(APIView):
    def get(self, request, id=None, format=None):  
        lv = User.objects.filter(groups__name='manager')
        # print(lv[0].first_name)
        serializer = ManagerSerializer(lv,many=True)
        return Response(serializer.data)
        
        