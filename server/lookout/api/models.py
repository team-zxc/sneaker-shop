from dal import autocomplete
from django.contrib.postgres.fields import ArrayField
from django.db import models
from django import forms


class ColorArrayField(ArrayField):
    def formfield(self, **kwargs):
        defaults = {
            'form_class': forms.MultipleChoiceField,
            'choices': self.base_field.choices,
            'widget': forms.CheckboxSelectMultiple,
        }

        return super(ArrayField, self).formfield(**defaults)


class Brand(models.Model):

    class Meta:
        verbose_name = 'Бренд'
        verbose_name_plural = 'Бренды'

    title = models.CharField(max_length=64, verbose_name='Название')

    def __str__(self):
        return self.title


class FootwearCategory(models.Model):
    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'

    brand = models.ForeignKey(
        to=Brand,
        on_delete=models.CASCADE,
        verbose_name='Бренд'
    )
    title = models.CharField(max_length=64, verbose_name='Название')


class Footwear(models.Model):
    COLORS = (
        ('black', 'Черный'),
        ('white', 'Белый'),
        ('green', 'Зеленый'),
    )

    class Meta:
        verbose_name = 'Обувь'
        verbose_name_plural = 'Обувь'

    class Genders(models.TextChoices):
        WOMAN = 'W'
        MAN = 'M'
        UNISEX = 'U'

    brand = models.ForeignKey(
        to=Brand,
        on_delete=models.CASCADE,
        verbose_name='Бренд'
    )
    category = models.ForeignKey(
        to=FootwearCategory,
        on_delete=models.CASCADE,
        verbose_name='Категория'
    )
    model = models.CharField(max_length=255, verbose_name='Модель')
    title = models.CharField(max_length=255, verbose_name='Название')
    gender = models.CharField(
        max_length=1,
        choices=Genders.choices,
        default=Genders.UNISEX,
    )
    colors = ColorArrayField(
        models.CharField(
            choices=COLORS,
            max_length=15,
        )
    )
    vendor_code = models.CharField(max_length=255, verbose_name='Артикул')
    description = models.TextField(verbose_name='Описание')
    # images = ArrayField(models.ImageField())

    def __str__(self):
        return self.title


class FootwearInstance(models.Model):
    class Meta:
        verbose_name = 'Пара'
        verbose_name_plural = 'Пары'

    sneaker = models.ForeignKey(
        to=Footwear,
        on_delete=models.CASCADE,
        verbose_name='Название'
    )
    size = models.IntegerField(verbose_name='Размер')
    price = models.IntegerField(verbose_name='Цена')
