from django.shortcuts import render
from .models import Product
from .serializers import ProductSerializer
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
@csrf_exempt
def ProductView(request):
    if request.method == 'GET':
        product = Product.objects.all()
        serializer = ProductSerializer(product, many=True)
        return JsonResponse(serializer.data, safe=False)
    
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = ProductSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data,status=201)
        return JsonResponse(serializer.error, status=400)
