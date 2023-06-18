# from dal import autocomplete
# from django.shortcuts import render
#
# from server.lookout.api.models import Brand, FootwearCategory
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework.generics import RetrieveAPIView

from .models import Footwear, Brand
from .serializers import BrandSerializer, FootwearSerializer


class FootwearAPIView(ListAPIView):
#     queryset = Footwear.objects.all()
    serializer_class = FootwearSerializer

    def get_queryset(self):
        queryset = Footwear.objects.all()
        brand = self.request.GET.get('brand')

        # Фильтрация по бренду, если параметр brand передан
        if brand:
            queryset = queryset.filter(brand__title=' '.join(brand.split('_')))

        return queryset


class PopularItemsAPIView(ListAPIView):
    serializer_class = FootwearSerializer

    def get_queryset(self):
        limit = self.request.GET.get('limit')
        queryset = Footwear.objects.order_by('-priority')

        if limit:
            queryset = queryset[:int(limit)]

        return queryset


class BrandAPIView(ListAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer

class SingleFootwearAPIView(RetrieveAPIView):
    queryset = Footwear.objects.all()
    serializer_class = FootwearSerializer
    lookup_field = 'pk'


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
