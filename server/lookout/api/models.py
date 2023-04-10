from django.db import models


class Brand(models.Model):
    title = models.CharField(max_length=64)


class Sneaker(models.Model):
    brand = models.ForeignKey(
        to=Brand,
        on_delete=models.CASCADE,
        verbose_name='Бренд'
    )
    title = models.CharField(max_length=255)

