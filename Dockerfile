 FROM python:3.5
 MAINTAINER Andrew Jesaitis <andrew@andrewjesaitis.com>

 ENV        PYTHONUNBUFFERED       1
 ENV        DJANGO_SETTINGS_MODULE hallway.production_settings
 ENV        UWSGI_NUM_PROCESSES    1
 ENV        UWSGI_NUM_THREADS      15
 ENV        UWSGI_UID              uwsgi
 ENV        UWSGI_GID              uwsgi
 ENV        UWSGI_LOG_FILE         /var/log/uwsgi/uwsgi.log

 RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        postgresql-client python-psycopg2 libpq-dev \
    && rm -rf /var/lib/apt/lists/*

 RUN mkdir /var/hallway
 ADD accounts /var/hallway/accounts
 ADD api /var/hallway/api
 ADD conversations /var/hallway/conversations
 ADD hallway /var/hallway/hallway
 ADD manage.py /var/hallway
 ADD webpack-stats-prod.json /var/hallway
 ADD requirements.txt /var/hallway
 ADD static /var/hallway/static
 ADD templates /var/hallway/templates
 ADD uwsgi-start.sh /
 WORKDIR /var/hallway

 RUN pip install --upgrade pip
 RUN pip install -r requirements.txt
 RUN pip install uwsgi

 RUN        groupadd uwsgi
 RUN        useradd uwsgi -g uwsgi -s /bin/false
 RUN        mkdir /var/log/uwsgi
 RUN        chown -R uwsgi:uwsgi /var/log/uwsgi
 RUN        chmod -R u+rX /var/log/uwsgi
 RUN        chown -R uwsgi:uwsgi /var/hallway
 RUN        chmod a+rw /var/hallway

 EXPOSE     8080

 RUN        chmod a+x /uwsgi-start.sh

 ENTRYPOINT ["/uwsgi-start.sh"]

