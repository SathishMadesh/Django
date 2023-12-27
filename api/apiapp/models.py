from django.db import models

# Create your models here.

class Products(models.Model):
    title = models.CharField(max_length=100)
    image = models.URLField()
    price = models.IntegerField()


    def __str__(self):
        return self.title