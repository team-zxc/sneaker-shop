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

from .views import FootwearAPIView, BrandAPIView

urlpatterns = [
    path('sneakers/', FootwearAPIView.as_view()),
    path('brands/', BrandAPIView.as_view()),
]