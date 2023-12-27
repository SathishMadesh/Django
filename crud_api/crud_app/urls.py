from django.urls import path
from .views import getView, postView, updateView, deleteView

urlpatterns = [
    path('api/', getView),
]