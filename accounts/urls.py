from django.conf.urls import include, url
from django.contrib.auth.decorators import login_required

from .views import UpdateProfileView


urlpatterns = [
    url(r'^', include('allauth.urls')),
    url(r'^profile/$', login_required(UpdateProfileView.as_view()), name='profile'),
]
