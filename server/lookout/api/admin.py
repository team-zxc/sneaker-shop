from dal import autocomplete
from django.contrib import admin
from django import forms
from django.contrib.postgres.fields import ArrayField
from django.forms import ModelForm

from .forms import FootwearForm
from .models import Brand, FootwearCategory, Footwear, FootwearInstance

admin.site.register(Brand)
admin.site.register(FootwearCategory)


# class ColorSelectForm(forms.Form):
#     # POSSIBLE_COLORS = [('black', 'Черный'), ('white', 'Белый')]
#
#     colors = forms.MultipleChoiceField(
#         required=False,
#         widget=forms.CheckboxSelectMultiple,
#         choices=POSSIBLE_COLORS,
#     )


# class AdminSneakerForm(ModelForm):
#     class Meta:
#         model = Footwear
#         widgets = {
#             'colors': ColorSelectForm
#         }
#         fields = '__all__'


class SneakerInstanceInline(admin.TabularInline):
    model = FootwearInstance


@admin.register(Footwear)
class AdminFootwear(admin.ModelAdmin):
    form = FootwearForm
    list_display = ('title', 'brand', 'category')
    inlines = [SneakerInstanceInline]

    # formfield_overrides = {
    #     ArrayField: {"widget": ColorSelectForm}
    # }
    # form = AdminSneakerForm


@admin.register(FootwearInstance)
class AdminFootwearInstance(admin.ModelAdmin):
    list_display = ('sneaker', 'size', 'price')


