from rest_framework import serializers

from .models import Brand, Footwear


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'


class FootwearSerializer(serializers.ModelSerializer):
    class Meta:
        model = Footwear
        fields = '__all__'

    def create(self, validated_data):
        pass

    def update(self, instance, validated_data):
        pass


