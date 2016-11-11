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

 RUN mkdir /var/app
 ADD accounts /var/app
 ADD api /var/app
 ADD conversations /var/app
 ADD hallway /var/app
 ADD manage.py /var/app
 ADD requirements.txt /var/app
 ADD static /var/app
 ADD templates /var/app
 ADD uwsgi-start.sh /
 WORKDIR /var/app

 RUN pip install --upgrade pip
 RUN pip install -r requirements.txt
 RUN pip install uwsgi

 RUN        groupadd uwsgi
 RUN        useradd uwsgi -g uwsgi -s /bin/false
 RUN        mkdir /var/log/uwsgi
 RUN        chown -R uwsgi:uwsgi /var/log/uwsgi
 RUN        chmod -R u+rX /var/log/uwsgi
 RUN        chown -R uwsgi:uwsgi /var/app
 RUN        chmod a+rw /var/app

 EXPOSE     8080

 RUN        chmod a+x /uwsgi-start.sh

 ENTRYPOINT ["/uwsgi-start.sh"]

