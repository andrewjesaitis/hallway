from hallway.settings import *

SECRET_KEY = os.environ['DJANGO_SECRET_KEY']

DEBUG = False

ALLOWED_HOSTS = ['andrewjesaitis.com']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('RDS_DB_NAME'),
        'USER': os.environ.get('RDS_USER'),
        'PASSWORD': os.environ.get('RDS_PASSWORD'),
        'HOST': os.environ.get('RDS_HOST'),
        'PORT': os.environ.get('RDS_PORT'),
    }
}

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'

EMAIL_USE_TLS = True
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = 'hallwayapp@gmail.com'
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_PASSWORD')
EMAIL_PORT = 587

WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'bundles/',
        'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats-prod.json'),
    }
}
