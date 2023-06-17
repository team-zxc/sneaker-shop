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

    title = models.CharField(max_length=64, verbose_name='Название')

    def __str__(self):
        return self.title


class FootwearModel(models.Model):
    class Meta:
        verbose_name = 'Модель'
        verbose_name_plural = 'Модели'

    brand = models.ForeignKey(
        to=Brand,
        on_delete=models.CASCADE,
        verbose_name='Бренд'
    )
    title = models.CharField(max_length=64, verbose_name='Название')

    def __str__(self):
        return self.title


class Footwear(models.Model):
    COLORS = (
        ('black', 'Черный'),
        ('white', 'Белый'),
        ('green', 'Зеленый'),
        ('purple', 'Фиолетовый'),
        ('red', 'Красный'),
        ('yellow', 'Желтый'),
        ('brown', 'Коричневый'),
        ('grey', 'Серый'),
        ('pink', 'Розовый'),
        ('blue', 'Синий'),
        ('orange', 'Оранжевый'),
    )

    class Meta:
        verbose_name = 'Пара'
        verbose_name_plural = 'Пары'

    class Genders(models.TextChoices):
        UNISEX = ('U', 'Унисекс')
        MAN = ('M', 'Мужской')
        WOMAN = ('W', 'Женский')

    category = models.ForeignKey(
        to=FootwearCategory,
        on_delete=models.CASCADE,
        verbose_name='Категория'
    )
    brand = models.ForeignKey(
        to=Brand,
        on_delete=models.CASCADE,
        verbose_name='Бренд'
    )
    model = models.ForeignKey(
        to=FootwearModel,
        on_delete=models.CASCADE,
        verbose_name='Модель'
    )
    name = models.CharField(max_length=255, verbose_name='Название')
    gender = models.CharField(
        max_length=1,
        choices=Genders.choices,
        default=Genders.UNISEX,
        verbose_name='Пол',
    )
    priority = models.IntegerField(verbose_name='Приоритет', default=0)
    colors = ColorArrayField(
        models.CharField(
            choices=COLORS,
            max_length=15,
        ),
        verbose_name='Цвета',
    )
    vendor_code = models.CharField(max_length=255, verbose_name='Артикул')
    description = models.TextField(verbose_name='Описание')

    def get_category_display(self):
        return self.category.title

    def get_brand_display(self):
        return self.brand.title

    def get_model_display(self):
        return self.model.title

    def get_image_names(self):
        images = Images.objects.filter(footwear_id=self.id)
        return [str(image.image) for image in images]

    def get_sizes(self):
        instances = self.footwearinstance_set.all()
        return [instance.get_size_amount_dict() for instance in instances]

#     def __str__(self):
#         return f'{self.category} {self.brand} {self.model} {self.name}'

    def __str__(self):
        return f'{self.get_category_display()} {self.get_brand_display()} {self.get_model_display()} {self.name}'



class FootwearInstance(models.Model):
    class Meta:
        verbose_name = 'Экземпляр'
        verbose_name_plural = 'Экземпляры'

    footwear = models.ForeignKey(
        to=Footwear,
        on_delete=models.CASCADE,
        verbose_name='Название'
    )
    size = models.IntegerField(verbose_name='Размер')
    price = models.IntegerField(verbose_name='Цена')

    def get_size_amount_dict(self):
        return {'size': self.size, 'amount': self.price}


class Images(models.Model):
    class Meta:
        verbose_name = 'Картинка'
        verbose_name_plural = 'Картинки'

    footwear = models.ForeignKey(
        to=Footwear,
        on_delete=models.CASCADE,
        verbose_name='Название'
    )

    image = models.ImageField(upload_to='images')

    def __str__(self):
        return self.image.name
