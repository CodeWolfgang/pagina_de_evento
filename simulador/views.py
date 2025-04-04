# simulador/views.py
from django.shortcuts import render
from django.http import JsonResponse
import random

probabilities = [
    {"type": "Apariencia Legendaria/Exclusiva ALLSTAR/Collector/LuckyBox/Épica exclusiva", "chance": 0.003},
    {"type": "Apariencia Épica", "chance": 0.012},
    {"type": "Apariencia Especial", "chance": 0.15},
    {"type": "Apariencia Élite", "chance": 1},
    {"type": "Apariencia Básica", "chance": 10},
    {"type": "Item", "chance": 65.835},
    {"type": "Corona Pecaminosa", "chance": 23},
]

def get_random_outcome():
    rand = random.uniform(0, 100)
    acumulado = 0
    for premio in probabilities:
        acumulado += premio["chance"]
        if rand < acumulado:
            return premio["type"]
    return "Sin premio"

def index(request):
    return render(request, "simulador/index.html")

def simular_tirada(request):
    resultado = get_random_outcome()
    # Aquí podrías guardar la tirada en la base de datos si se requiere.
    return JsonResponse({"resultado": resultado, "costo": 1600})
