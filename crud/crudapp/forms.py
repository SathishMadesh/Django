from django import forms
from crudapp.models import Employee


class EmployeeForm(forms.ModelForm):
    class Meta:
        model = Employee
        fields = ['eid','ename','eloc','email','esal']