# hallway
![hallway](https://raw.githubusercontent.com/andrewjesaitis/hallway/master/hallwayDemo.png?token=AAjILV71IO1LmI-B0Eq_TQNWZtNcyKybks5YTz4FwA%3D%3D "Hallway")

### Description

A virtual hallway for online classrooms

### Installation
[Install docker and docker-compose](https://docs.docker.com/compose/install/)

Next, in the settings file, update the `S3_BUCKET` setting to the name where you want to save the videos. You need to enable cross orgin requests on this bucket. This can be done by adding a policy to the bucket through the console. The policy will look like:

```
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
    <CORSRule>
        <AllowedOrigin>http://localhost</AllowedOrigin>
        <AllowedMethod>GET</AllowedMethod>
        <AllowedMethod>POST</AllowedMethod>
        <AllowedMethod>PUT</AllowedMethod>
        <AllowedHeader>*</AllowedHeader>
    </CORSRule>
</CORSConfiguration>
```

Then at the command line,

```
> docker-compose up
```
This will launch three containers: the app, the db, and the server. The volume is bound to the app container so any changes to the files are available immediately to be rendered. Django debug toolbar and React Hot Module Replacement are both proxied through the server. The db uses the dev db name, username and password in the secrets.env file.

Then just open your browser to `localhost`.

### Production

The app is designed to be deployed on AWS Elastic Beanstalk. A few things to note:

First, the deploy assumes a secrets.env file, which is parsed by `create_env_config.py` into environment variables on EC2 to give the app access to the various services it needs. There is a dummy file included to show expected keys, but you'll need to fill in the values. Additionally, you need to fill in your AWS id number in `.ebextensions/iam.config`.

Second, since the app needs to use the webcam, it must be deployed with an ssl cert and accessed using https. Checkout `.ebextensions/ssl_rewrite.config` to see how the the rewrite settings are deployed. The cert itself is hosted on the load balancer.

Finally, the deploy script builds the production docker container, pushes it to dockerhub, and then the Elastic Beanstalk deploy pulls it from dockerhub. So you'll need to update the deploy script to tag the image with the appropriate repo and update the push location. You'll also need to put your dockerhub credentials into a s3 bucket so Elastic Beanstalk can pull the image if it is in a private repo. For more information, [see here](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_docker.container.console.html).
