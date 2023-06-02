# from rest_framework import serializers
#
# from .models import Brand
#
#
# class BrandSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Brand
#         fields = 'title'
#
#
# class SneakerSerializer(serializers.Serializer):
#     brand = serializers.IntegerField()
#     title = serializers.CharField(max_length=255)
#     size = models.IntegerField(verbose_name='Размер')
#     price = models.IntegerField(verbose_name='Цена')
#     vendor_code = models.CharField(max_length=255, verbose_name='Артикул')
#     description = models.TextField(verbose_name='Описание')
#
#     def create(self, validated_data):
#         pass
#
#     def update(self, instance, validated_data):
#         pass
#
#
