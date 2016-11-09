 FROM python:3.5
 ENV PYTHONUNBUFFERED 1
 RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -
 RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        postgresql-client python-psycopg2 libpq-dev \
        netcat nodejs \
    && rm -rf /var/lib/apt/lists/*

 WORKDIR /tmp
 COPY package.json /tmp/
 RUN npm config set registry http://registry.npmjs.org/ && npm install

 RUN mkdir /code
 WORKDIR /code
 RUN cp -a /tmp/node_modules /usr/src/app/
 ADD requirements.txt /code/
 RUN pip install --upgrade pip
 RUN pip install -r requirements.txt
 ADD . /code/