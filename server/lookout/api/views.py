# from dal import autocomplete
# from django.shortcuts import render
#
# from server.lookout.api.models import Brand, FootwearCategory
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Footwear, Brand
from .serializers import BrandSerializer, FootwearSerializer


class FootwearAPIView(ListAPIView):
    queryset = Footwear.objects.all()
    serializer_class = FootwearSerializer


class BrandAPIView(ListAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer


# class CategoryAutocompleteView(autocomplete.Select2QuerySetView):
#     def get_queryset(self):
#         categories = FootwearCategory.objects.all()
#
#         brand = self.forwarded.get('brand', None)
#
#         if brand:
#             categories.filter(brand=brand)
#
#         return categories
