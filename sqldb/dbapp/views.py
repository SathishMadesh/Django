from django.shortcuts import render
from dbapp.models import Employee

# Create your views here.

def getempdata(request):
    emp_list = Employee.objects.all()
    return render(request,'emp.html',context={'emp_list':emp_list})