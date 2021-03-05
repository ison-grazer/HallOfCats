function init(){
    const tags = ['kitten','cute','cat','cats']
  const requestURL =
    "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=6d2da648dc97c53db61331af1f2e1cdc&per_page=30&format=json&nojsoncallback=1&tags='" +
    tags[0] +
    ',+' +
    tags[1] +
    ',+' +
    tags[2] +
    ',+' +
    tags[3] +
    "'&tag_mode=all&sort=interestingness-desc&extras=description&extras=url_w";    
    
    window.onload = function () {
        let greeting_msg = greet();
        document.getElementById('greeting').innerHTML = '<h2>' + greeting_msg + '</h2>';
        requestImages(requestURL);
      }; 

    //Hide the loader when DOM has loaded
window.addEventListener('DOMContentLoaded', function () {
    const loader = document.querySelector('.loader');
    loader.className += ' hidden';
  });
}


function greet() {
  let date = new Date();
  let time = date.getHours();
  let greeting;
  if (time < 12 && time >= 5) {
    greeting = 'Good Morning!';
  } else if (time < 18 && time >= 12) {
    greeting = 'Good Afternoon!';
  } else if (time < 24 && time >= 18) {
    greeting = 'Good Evening!';
  }
  else if (time >= 0 && time <= 5) {
    greeting = 'Good Night!';
  }
  return greeting; 
}


function display_errorMsg(responseObj) {
  let error_node = document.createElement('p');
  let msg_node = document.createTextNode(
    'API Error Code ' + responseObj.code + ':  \n' + responseObj.message
  );
  error_node.appendChild(msg_node);
  document.getElementById('fetching_error').innerHTML =
    "<h2 class='display_error'>Some images couldn't be fetched from the Flickr API. \n Please try again later!</h2>";
  document.getElementById('fetching_error').appendChild(error_node);
}


function requestImages(requestURL) {
var xmlhttp = new XMLHttpRequest();
  xmlhttp.open('GET', requestURL, true);
  xmlhttp.send();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let responseObj = JSON.parse(this.responseText);
      if (responseObj.stat === 'ok') {
        let images = displayInGallery(40, responseObj);
        document.getElementById('galleryDiv').innerHTML = images;
      }
      if (responseObj.stat === 'fail') {
        display_errorMsg(responseObj);
      }
    }
  };
}

function displayInGallery(numPhotos, imageObj) {
  var images = '';
  imageObj.photos.photo.forEach((img) => {
    if (numPhotos === 0) {
      return images;
    }
    numPhotos--;

    let serverID, photoID, photoSecret;
    serverID = img.server;
    photoID = img.id;
    photoSecret = img.secret;
    let description = 'Image of a cat. ' + img.title;

    images +=
      "<div class='photobox'><img class='pics' src = https://live.staticflickr.com/" +
      serverID +
      '/' +
      photoID +
      '_' +
      photoSecret +
      ".jpg' alt=" +
      description +
      ' /></div>';
  });
  return images;
}

init();

module.exports = greet;