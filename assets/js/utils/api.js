function getSignedRequest(file){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/api/sign_s3?file_name="+file.name+"&file_type="+encodeURIComponent(file.type));
  xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
      if(xhr.status === 200){
        var response = JSON.parse(xhr.responseText);
        console.log(response);
        uploadFile(file, response.data, response.url);
      }
      else{
        alert("Could not get signed URL.");
      }
    }
  };
  xhr.send();
}
function uploadFile(file, s3Data, url){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", s3Data.url);

  var postData = new FormData();
  for(key in s3Data.fields){
    postData.append(key, s3Data.fields[key]);
  }
  postData.append('file', file.data);

  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4){
      if(xhr.status === 200 || xhr.status === 204){
          console.log("uploaded: " + url);
          updateDb(url);
      }
      else{
        alert("Could not upload file.");
      }
   }
  };
  xhr.send(postData);
}

function updateDb(url){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", '/messages/videos');
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  var postData = JSON.stringify({'s3_url': url});

  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4){
      if(xhr.status === 200 || xhr.status === 201){
          console.log("s3_url added: " + url);
          alert("Success!");
      }
      else{
        alert("Could not updatn db.");
      }
   }
  };
  xhr.send(postData);
}
