from django.urls import path
from .views import getView, postView, updateView, deleteView

urlpatterns = [
    path('api/', getView),
    path('post/', postView),
    path('update/<int:id>', updateView),
    path('delete/<int:id>', deleteView)
]