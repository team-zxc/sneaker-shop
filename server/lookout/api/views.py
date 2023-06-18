# from dal import autocomplete
# from django.shortcuts import render
#
# from server.lookout.api.models import Brand, FootwearCategory
import json
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from rest_framework.decorators import api_view
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


@api_view(['POST'])
def create_order(request):
    data = json.loads(request.body)

    msg = MIMEMultipart()

    msg['To'] = data['contacts']['email']
    msg['Subject'] = "Новый заказ"

    msg.attach(MIMEText(str(data['items']), 'plain'))


    # Поменять в зависимости от почты
    server = smtplib.SMTP('smtp.mail.ru: 772')
    password = "zxc"
    msg['From'] = "zxc@zxc.zxc"

    server.starttls()

    server.login(msg['From'], password)

    server.sendmail(msg['From'], msg['To'], msg.as_string())

    server.quit()

    return Response(status=200)



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
