#!/bin/bash
set -x
set -e
start=`date +%s`

source ~/.virtualenvs/hallway/bin/activate

rm -f hallway.zip
./create_env_config.py
zip -r hallway.zip .ebextensions Dockerrun.aws.json

npm run production
python manage.py collectstatic --clear --noinput

docker build -t andrewjesaitis/hallway .
docker push andrewjesaitis/hallway

eb deploy

end=`date +%s`
runtime=$((end-start))
echo "Deploy Took: $runtime seconds"
