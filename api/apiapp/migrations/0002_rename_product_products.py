# Generated by Django 5.0 on 2023-12-26 06:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('apiapp', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Product',
            new_name='Products',
        ),
    ]