from django.db import models


class Brand(models.Model):
    title = models.CharField(max_length=64, verbose_name='Название')

    def __str__(self):
        return self.title


class Sneaker(models.Model):
    brand = models.ForeignKey(
        to=Brand,
        on_delete=models.CASCADE,
        verbose_name='Бренд'
    )
    title = models.CharField(max_length=255, verbose_name='Название')
    size = models.IntegerField(verbose_name='Размер')
    price = models.IntegerField(verbose_name='Цена')
    vendor_code = models.CharField(max_length=255, verbose_name='Артикул')
    description = models.TextField(verbose_name='Описание')

    def __str__(self):
        return f'{self.brand} {self.title} {self.size}'

