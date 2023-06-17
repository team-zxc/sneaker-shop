from rest_framework import serializers

from .models import Brand, Footwear


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'


class FootwearSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='get_category_display')
    brand = serializers.CharField(source='get_brand_display')
    model = serializers.CharField(source='get_model_display')
    sizes = serializers.SerializerMethodField()
    images = serializers.SerializerMethodField()

    def get_sizes(self, obj):
        return obj.get_sizes()

    def get_images(self, obj):
        return obj.get_image_names()

    class Meta:
        model = Footwear
        fields = '__all__'

    def create(self, validated_data):
        pass

    def update(self, instance, validated_data):
        pass
