# simulador/models.py
from django.db import models
from django.contrib.auth.models import User

class Tirada(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    resultado = models.CharField(max_length=100)
    diamantes_gastados = models.IntegerField(default=1600)
    fecha = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.usuario.username} - {self.resultado} - {self.diamantes_gastados}"