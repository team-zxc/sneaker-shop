from django.contrib import admin
from django import forms
from django.contrib.postgres.fields import ArrayField
from django.forms import ModelForm

# from .forms import FootwearForm
from .models import Brand, FootwearCategory, Footwear, FootwearInstance, Images, FootwearModel

admin.site.register(Brand)
admin.site.register(FootwearCategory)
admin.site.register(FootwearModel)


class SneakerInstanceInline(admin.TabularInline):
    model = FootwearInstance


class SneakerImagesInline(admin.TabularInline):
    model = Images


@admin.register(Footwear)
class AdminFootwear(admin.ModelAdmin):
    inlines = [SneakerInstanceInline, SneakerImagesInline]


