from django.contrib.auth.forms import AuthenticationForm
from django.forms import ModelForm
from django import forms
from django.contrib.auth.models import User

from .models import Profile

# If you don't do this you cannot use Bootstrap CSS
class LoginForm(AuthenticationForm):
    username = forms.CharField(label="Username", max_length=30, 
                               widget=forms.TextInput(attrs={'class': 'form-control', 'name': 'username'}))
    password = forms.CharField(label="Password", max_length=30, 
                               widget=forms.TextInput(attrs={'class': 'form-control', 'name': 'password', 'type':'password'}))


class UserForm(ModelForm):
    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name',)

class ProfileForm(ModelForm):
    class Meta:
        model = Profile
        fields = ('twitter_url', 'google_plus_url', 'facebook_url',)
