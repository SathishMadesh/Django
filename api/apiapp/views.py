from django.shortcuts import render
from .models import Products
from .serializers import ProductsSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
@api_view(['GET','POST'])
def ProductsView(request):
    if request.method == 'GET':
        products = Products.objects.all()
        serializer = ProductsSerializer(products, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = ProductsSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET','PUT','DELETE'])
def product_details(request, pk):  # id or pk(primary key)
    try:
        product = Products.objects.get(pk=pk)
    except product.DoesNotExist:
        return Response(status=404)
    
    if request.method == 'GET':
        serializer = ProductsSerializer(product)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = ProductsSerializer(product, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
    elif request.method == 'DELETE':
        product.delete()
        return Response(status=204)
