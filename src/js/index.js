
import * as facebook from './facebook/facebook';
import userModule from './module/user.module';
import sidePanel from './sidePanel';
import * as articleContent from './showArticle';
import createChallenge from './createChallenge';
var storage = window.sessionStorage;

document.addEventListener("DOMContentLoaded", (event) => {
  console.log("init");


  let body = document.getElementsByTagName("body")[0];
  switch(body.id){
    case "INDEX":
      facebook.initFacebook;
      initIndex();
      break;
    case "ALL":
      facebook.initFacebook;
      initProfile();
      break;
    default:
      break;
  }

});

// CODE FOR INDEX PAGE
function initIndex(){
  var popup = document.getElementById("signup");
  var fbLogin = document.getElementsByClassName("loginBtn--facebook")[0];
  var signups = document.getElementsByClassName("startNow");
  var close = document.getElementsByClassName("close")[0];

  for(var i=0; i<signups.length; i++){

    signups[i].addEventListener("click", (element) => {
      popup.style.display = "block";
    });
  }

  close.addEventListener("click", (element) => {
    popup.style.display = "none";
  });

  window.addEventListener("click", (element) => {
    if (element.target == popup) {
        popup.style.display = "none";
    }
  });

  fbLogin.addEventListener("click", () => {
    FB.login((response) => {
      if(response.status == "connected"){
        var accessToken = response.authResponse.accessToken;
        storage.setItem("nmct.facebook.accessToken", accessToken);
        userModule.createUser(accessToken).then(function(response){
          userModule.getUserData(response).then(function(response){
            sessionStorage.setItem("nmct.darem.accessToken", response.facebook.id);
            sessionStorage.setItem("nmct.darem.accessTokenDB", response.facebook.databaseid);
            sessionStorage.setItem("nmct.darem.user", JSON.stringify(response));
            window.location.href = "./profile.html"
          });
        });
      }else{
        window.location.href = "./index.html";
      }
    }, {scope: 'public_profile, email, user_friends'});
  });

  if(storage.getItem("nmct.darem.user") != null && storage.getItem("nmct.facebook.accessToken") ){
    window.location.href = "./profile.html";
  }

}

// CODE FOR CHALLENGE PAGE
function initProfile(){
  sidePanel();
  articleContent.initCreate();
  notifications.addEventListener('click', function(){
    articleContent.initInvite();
  });


}
