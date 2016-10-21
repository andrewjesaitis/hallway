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
    });
}

function uploadFile(blob, { awsInfo, s3Url }) {
  const postData = new FormData();
  _.forIn(awsInfo.fields, (v, k) => {
    postData.append(k, v);
  });
  postData.append('file', blob);
  return axios.post(
    awsInfo.url, postData).then((res) => {
      console.log('Video uploaded');
      console.log(res);
      return res;
    });
}

function createConversation(subject) {
  const postData = {
    subject,
  };
  const config = {
    headers: { 'X-CSRFToken': Cookies.get('csrftoken') },
  };
  return axios.post(
    '/api/v1/conversations/',
    postData,
    config)
   .then((res) => {
     console.log('Conversation Created');
     console.log(res);
     return Promise.resolve(res.data);
   });
}

function createMessage(subject, conversationId, s3Url) {
  const postData = {
    url: s3Url,
    conversation: conversationId,
  };
  const config = {
    headers: { 'X-CSRFToken': Cookies.get('csrftoken') },
  };
  return axios.post(
    '/api/v1/messages/',
    postData,
    config)
   .then((res) => {
     console.log('Message Created');
     console.log(res);
     return Promise.resolve(res.data);
   });
}

export function uploadVideo(blob, subject, conversation) {
  // all I want for christmas is async/await !!
  const s3Sign = getSignedRequest(blob);
  const s3Upload = s3Sign.then(res => uploadFile(blob, res.data));
  const convo = s3Upload.then(() => { // we only want to create a convo if upload succeeds
    if (conversation === null) {
      return createConversation(subject);
    }
    return Promise.resolve(conversation);
  });
  const message = Promise.all([s3Sign, convo])
    .then(values => {
      const [s3SignRes, convoResult] = values;
      return createMessage(convoResult.pk, s3SignRes.data.s3Url);
    });
  return Promise.all([convo, message])
                .then(values => {
                  const [convoResult, messageResult] = values;
                  convoResult.messages.push(messageResult);
                  return Promise.resolve(convoResult);
                });
}

export function getConversations() {
  const config = {
    headers: { 'X-CSRFToken': Cookies.get('csrftoken') },
  };
  return axios.get(
    '/api/v1/conversations/',
    config
  ).then((res) => {
    console.log('Conversations Retrieved');
    console.log(res);
    return res;
  }).catch((err) => {
    console.warn('Could not retrieve Conversations');
    console.log(err);
  });
}

export function getMessages(conversationId) {
  const config = {
    headers: { 'X-CSRFToken': Cookies.get('csrftoken') },
  };
  return axios.get(
    `/api/v1/messages/?conversation=${conversationId}`,
    config
  ).then((res) => {
    console.log(`Messages retrieved for conversation ${conversationId}`);
    return res;
  }).catch((err) => {
    console.warn(`Couldn't fetch messages for conversation ${conversationId}`);
    console.log(err);
  });
}
