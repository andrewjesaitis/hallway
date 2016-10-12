from django.conf.urls import include, url
from django.views.generic import TemplateView

from rest_framework.routers import DefaultRouter

from conversations.views import ConversationViewSet, MessageViewSet
from . import views

router = DefaultRouter()
router.register(r'conversations', ConversationViewSet, base_name='conversations')
router.register(r'messages', MessageViewSet, base_name='messages')


urlpatterns = [
    url(r'^v1/sign_s3$', views.sign_s3),
    url(r'v1/', include(router.urls)), 
]
