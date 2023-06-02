from dal import autocomplete
from django.shortcuts import render

from server.lookout.api.models import Brand, FootwearCategory


class SneakerAPIView:
    pass


class CategoryAutocompleteView(autocomplete.Select2QuerySetView):
    def get_queryset(self):
        categories = FootwearCategory.objects.all()

        brand = self.forwarded.get('brand', None)

        if brand:
            categories.filter(brand=brand)

        return categories
