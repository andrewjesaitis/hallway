from django.shortcuts import render
from django.conf import settings
from django.http import JsonResponse

import boto3

# Create your views here.

def sign_s3(request):
    file_name = request.GET.get('file_name')
    file_type = request.GET.get('file_type')

    s3 = boto3.client('s3')

    presigned_post = s3.generate_presigned_post(
        Bucket = settings.S3_BUCKET,
        Key = file_name,
        Fields = {"acl": "public-read", "Content-Type": file_type},
        Conditions = [
            {"acl": "public-read"},
            {"Content-Type": file_type}
        ],
        ExpiresIn = 3600
    )
    res = { 
        'awsInfo': presigned_post,
        's3Url': 'https://%s.s3.amazonaws.com/%s' % (settings.S3_BUCKET, file_name)
    }

    return JsonResponse(res)
