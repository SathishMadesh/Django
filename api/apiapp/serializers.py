from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=100)
    image = serializers.URLField()
    price = serializers.IntegerField()

    def create(self, validate_data):
        return Product.objects.create(validate_data)
    
    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', validated_data.title)
        instance.image = validated_data.get('image', validated_data.image)
        instance.price = validated_data.get('price', validated_data.price)