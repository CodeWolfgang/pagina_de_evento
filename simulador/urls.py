# simulador/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("api/tirada/", views.simular_tirada, name="simular_tirada"),
]
