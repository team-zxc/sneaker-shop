# from views import CategoryAutocompleteView
#
# from django.urls import re_path as url
#
# from .models import Footwear
#
# urlpatterns = [
#     url(
#         '^footwear_category_autocomplete/$',
#         CategoryAutocompleteView.as_view(model=Footwear),
#         name='footwear-category-autocomplete'
#     ),
# ]
from django.urls import path

from .views import FootwearAPIView, BrandAPIView, SingleFootwearAPIView, PopularItemsAPIView

urlpatterns = [
    path('sneakers/', FootwearAPIView.as_view()),
    path('brands/', BrandAPIView.as_view()),
    path('sneakers/<int:pk>/', SingleFootwearAPIView.as_view()),
    path('populars', PopularItemsAPIView.as_view(), name='popular-items'),
]