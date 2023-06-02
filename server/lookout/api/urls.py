from views import CategoryAutocompleteView

from django.urls import re_path as url

from .models import Footwear

urlpatterns = [
    url(
        '^footwear_category_autocomplete/$',
        CategoryAutocompleteView.as_view(model=Footwear),
        name='footwear-category-autocomplete'
    ),
]