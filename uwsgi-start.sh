#!/bin/bash

cd /var/hallway
WSGI_PATH=/var/hallway/hallway/wsgi.py

uwsgi --http :8080 --chdir /var/hallway --wsgi-file $WSGI_PATH $UWSGI_MODULE --static-map /static=/var/hallway/static --master --processes $UWSGI_NUM_PROCESSES --threads $UWSGI_NUM_THREADS --uid $UWSGI_UID --gid $UWSGI_GID --logto2 $UWSGI_LOG_FILE
