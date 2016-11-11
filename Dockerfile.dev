 FROM python:3.5
 ENV PYTHONUNBUFFERED 1
 RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -
 RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        postgresql-client python-psycopg2 libpq-dev \
        netcat nodejs \
    && rm -rf /var/lib/apt/lists/*

 RUN mkdir /code
 ADD . /code/
 WORKDIR /code
 RUN npm install
 RUN pip install --upgrade pip
 RUN pip install -r requirements.txt

