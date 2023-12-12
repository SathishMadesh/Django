from django.shortcuts import render, redirect
from crudapp.models import Employee
from crudapp.forms import EmployeeForm

# Create your views here.

def createemp(request):
    if request.method == "POST":
        empform = EmployeeForm(request.POST)
        if empform.is_valid():
            try:
                empform.save()
                return redirect('/create/')
            except:
                pass
    else:
        empform = EmployeeForm()

    return render (request, 'create.html',{'empform':empform})


def getemp(request):
    emp_list = Employee.objects.all()
    return render(request,'display.html',{'emp_list':emp_list})

def deleteemp(request,id):
    empdata = Employee.objects.get(id=id)
    empdata.delete()
    return redirect('/display/')

def editemp(request,id):
    employee = Employee.objects.get(id=id)
    return render (request,'update.html',{'employee':employee})

def updateemp(request, id):
    empdata = Employee.objects.get(id=id)
    if request.method == "POST":
        empdata = EmployeeForm(request.POST,instance=empdata)
        if empdata.is_valid():
            try:
                empdata.save()
                return redirect('/display/')
            except:
                pass
    
    else:
        return render(request,'update.html')