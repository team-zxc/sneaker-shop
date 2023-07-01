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

from .models import Footwear, Brand, Images
from .serializers import BrandSerializer, FootwearSerializer

from django.forms.models import model_to_dict


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
    # Получение имени пользователя из данных запроса
    name = data['contacts'].get('name', 'Пользователь')

    msg = MIMEMultipart()

    msg['To'] = data['contacts']['email']
    msg['Subject'] = "Новый заказ Lookout"

    def get_item_data_by_id(item_id):
        try:
            footwear = Footwear.objects.get(id=item_id)
            # Извлечение нужных данных из объекта footwear
            item_data = model_to_dict(footwear)
            item_data['category'] = footwear.category.title
            item_data['brand'] = footwear.brand.title
            item_data['model'] = footwear.model.title
            # Получение ссылок на картинки связанные с footwear
            images = Images.objects.filter(footwear=footwear)
            image_urls = [image.image.url for image in images]

            item_data['images'] = image_urls
            # Преобразование значений строк в юникод для поддержки кириллицы
            item_data_unicode = {key: str(value) for key, value in item_data.items()}
            return item_data_unicode
        except Footwear.DoesNotExist:
            return None

    items = data['items']
    items_with_data = []
    for item in items:
        item_id = item['id']
        item_data_unicode = get_item_data_by_id(item_id)  # Здесь получаем все данные элемента по его id из другой таблицы
        item_with_data = {
            'id': item_id,
            'data': item_data_unicode,
            'size': item['size'],
            'count': item['count'],
            'images': item_data_unicode['images'] if item_data_unicode else []
        }
        items_with_data.append(item_with_data)

    # Формирование текста сообщения
    message = f"Добрый день, {name}!\n\nВы оформили заказ:\n"

    for item_with_data in items_with_data:
        category = item_with_data['data']['category']
        brand = item_with_data['data']['brand']
        model = item_with_data['data']['model']
        item_name = item_with_data['data']['name']
        size = item_with_data['size']
        count = item_with_data['count']

        item_message = f"{category} {brand} {model} {item_name} размером {size} в количестве {count}"
        message += item_message + "\n"

    message += "\nОжидайте, с вами свяжется продавец по номеру или почте.\n\nС уважением, Владислав Петров\nКонтакты:\nvp.vlad00@mail.ru\n89035101495\n@vinatian00"

    # Установка содержимого сообщения в формате HTML
    msg.attach(MIMEText(message, 'plain'))

    # Поменять в зависимости от почты
    server = smtplib.SMTP_SSL('smtp.mail.ru', 465)
    password = "tS2RENcsg9Reu4xyJ9kX"
    msg['From'] = "vp.vlad00@mail.ru"

#     server.starttls()

    server.login(msg['From'], password)

#   Отправка сообщения покупателю
    server.sendmail(msg['From'], msg['To'], msg.as_string())

    # Формирование сообщения для продавца
    seller_message = f"Поступил заказ от заказчика - {name}:\n\n"
    for item_with_data in items_with_data:
        category = item_with_data['data']['category']
        brand = item_with_data['data']['brand']
        model = item_with_data['data']['model']
        item_name = item_with_data['data']['name']
        size = item_with_data['size']
        count = item_with_data['count']
        vendor_code = item_with_data['data'].get('vendor_code', '')

        item_message = f"{category} {brand} {model} {item_name} размером {size} в количестве {count}. Артикул: {vendor_code}"
        seller_message += item_message + "\n"

    seller_message += "\nКонтакты для связи с заказчиком:\n"
    seller_message += data['contacts']['email'] + "\n"
    seller_message += data['contacts']['phone'] + "\n"

    # Отправка письма продавцу
    seller_msg = MIMEMultipart()
    seller_msg['From'] = msg['From']
    seller_msg['To'] = msg['From']
    seller_msg['Subject'] = "Lookout. Новый заказ"

    # Установка содержимого сообщения для продавца
    seller_msg.attach(MIMEText(seller_message, 'plain'))

    server.sendmail(seller_msg['From'], seller_msg['To'], seller_msg.as_string())

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
