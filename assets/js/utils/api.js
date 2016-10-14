import axios from 'axios';
import _ from 'lodash';
import * as Cookies from 'js-cookie';


function getSignedRequest(blob) {
  return axios.get(
    '/api/v1/sign_s3', { params: {
      file_name: Math.floor(Math.random() * 90000) + 10000,
      file_type: blob.type,
    } }).then((res) => {
      console.log('Obtained S3 Key');
      console.log(res);
      return res;
    }).catch((err) => {
      console.warn('Could not get S3 Key');
      console.log(err);
    });
}

function uploadFile(blob, { data, url }) {


  console.log('In upload file');
  const postData = new FormData();
  _.forIn(data.fields, (v, k) => {
    postData.append(k, v);
  });
  postData.append('file', blob);
  return axios.post(
    data.url, postData).then((res) => {
      console.log('Video uploaded');
      console.log(res);
      res.s3Url = url;
      return res;
    }).catch((err) => {
      console.warn('Could not upload file');
      console.log(err);
    });
}

function updateDb(subject, { s3Url }) {
  const dbPostData = {
    subject,
    url: s3Url,
    conversation: null,
  };
  const config = {
    headers: { 'X-CSRFToken': Cookies.get('csrftoken') },
  };
  console.log(dbPostData);
  return axios.post(
    '/api/v1/messages/',
    dbPostData,
    config)
   .then((res) => {
    console.log('Db Updated');
    console.log(res);
    return res;
  }).catch((err) => {
    console.warn('Could not update database');
    console.log(err);
  });
}

export function uploadVideo(blob, subject) {
  return getSignedRequest(blob)
         .then((res) => uploadFile(blob, res.data))
         .then((res) => updateDb(subject, res))
         .catch(() => {
           console.warn('Error during upload');
         });
}
