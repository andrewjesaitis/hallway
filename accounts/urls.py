from django.conf.urls import include, url
from django.contrib.auth.decorators import login_required
from django.views.generic import TemplateView
from django.contrib.auth import views as auth_views

from accounts.forms import LoginForm


urlpatterns = [
    url(r'^login/$', auth_views.login, {'template_name': 'login.html', 'authentication_form': LoginForm}, name='login'),
    url(r'^logout/$', auth_views.logout, {'next_page': '/'}, name='logout'),
    url(r'^', include('registration.backends.simple.urls')),
    url(r'^profile/$', login_required(TemplateView.as_view(template_name='profile.html')), name='profile'),
]
