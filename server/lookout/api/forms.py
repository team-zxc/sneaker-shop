# from dal import autocomplete
#
# from django import forms
#
# from .models import Footwear
#
#
# class FootwearForm(forms.ModelForm):
#     def clean_test(self):
#         owner = self.cleaned_data.get('owner', None)
#         value = self.cleaned_data.get('test', None)
#
#         if value and owner and value.owner != owner:
#             raise forms.ValidationError('Wrong owner for test')
#
#         return value
#
#     class Meta:
#         model = Footwear
#         fields = '__all__'
#         widgets = {
#             'category': autocomplete.ModelSelect2(
#                 url='footwear_category_autocomplete',
#                 forward='brand'
#             )
#         }

    # class Media:
    #     js = (
    #         'linked_data.js',
    #     )
