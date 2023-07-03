# Generated by Django 4.2 on 2023-06-04 16:31

import api.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Brand',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=64, verbose_name='Название')),
            ],
            options={
                'verbose_name': 'Бренд',
                'verbose_name_plural': 'Бренды',
            },
        ),
        migrations.CreateModel(
            name='Footwear',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('model', models.CharField(max_length=255, verbose_name='Модель')),
                ('title', models.CharField(max_length=255, verbose_name='Название')),
                ('gender', models.CharField(choices=[('W', 'Woman'), ('M', 'Man'), ('U', 'Unisex')], default='U', max_length=1)),
                ('colors', api.models.ColorArrayField(base_field=models.CharField(choices=[('black', 'Черный'), ('white', 'Белый'), ('green', 'Зеленый')], max_length=15), size=None)),
                ('vendor_code', models.CharField(max_length=255, verbose_name='Артикул')),
                ('description', models.TextField(verbose_name='Описание')),
                ('brand', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.brand', verbose_name='Бренд')),
            ],
            options={
                'verbose_name': 'Обувь',
                'verbose_name_plural': 'Обувь',
            },
        ),
        migrations.CreateModel(
            name='FootwearInstance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('size', models.IntegerField(verbose_name='Размер')),
                ('price', models.IntegerField(verbose_name='Цена')),
                ('sneaker', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.footwear', verbose_name='Название')),
            ],
            options={
                'verbose_name': 'Пара',
                'verbose_name_plural': 'Пары',
            },
        ),
        migrations.CreateModel(
            name='FootwearCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=64, verbose_name='Название')),
                ('brand', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.brand', verbose_name='Бренд')),
            ],
            options={
                'verbose_name': 'Категория',
                'verbose_name_plural': 'Категории',
            },
        ),
        migrations.AddField(
            model_name='footwear',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.footwearcategory', verbose_name='Категория'),
        ),
    ]