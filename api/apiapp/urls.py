from django.urls import path
from .views import ProductsView, product_details


urlpatterns = [
    path('products/', ProductsView),
    path('product/<int:pk>', product_details)
]