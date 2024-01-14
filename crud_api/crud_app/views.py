from django.shortcuts import render
from .models import Employees
from .serializers import EmpSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.

@api_view(['GET'])
def getView(request):
    employee = Employees.objects.all()
    serializer = EmpSerializer(employee, many=True)
    return Response(serializer.data)
 
@api_view(['POST'])
def postView(request):
    serializer = EmpSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)
 
@api_view(['PUT'])
def updateView(request, id):
    empdata = Employees.objects.get(id=id)
    serializer = EmpSerializer(empdata, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

@api_view(['DELETE'])
def deleteView(request, id):
    empdata = Employees.objects.get(id=id)
    empdata.delete()
    return Response(status=204)