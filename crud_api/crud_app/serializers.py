from rest_framework import serializers
from .models import Employees

class EmpSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employees
        fields = ['eid','ename','eloc','esal']