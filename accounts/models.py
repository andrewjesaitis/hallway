from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    twitter_url = models.URLField(blank=True)
    google_plus_url = models.URLField(blank=True)
    facebook_url = models.URLField(blank=True)
