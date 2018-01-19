
import * as facebook from './facebook/facebook';
import userModule from './module/user.module';
import sidePanel from './sidePanel';
var storage = window.sessionStorage;

var pages = {
  createPage: "<h2>Create your challenges</h2><form class='createChallenge' action='#' method='post'><p><label for='Name'>Challenge Name</label><input type='text' name='Name' class='challengeFields'/></p><p><label for='Description'>Challenge Description</label><input type='text' name='Description'  class='challengeFields'/></p><p><label for='Category'>Pick a category</label><label for='addFriends'>Add Friends</label></p><input type='submit' name='submit' value='Submit'></form>",
  chatPage: "<h2>Chat with your friends</h2><section><div class='chatSpace'>chat</div><div class='chatbar'><input type='text' placeholder='Type here...'><button>Send</button></div></section>",
  detailPage: "<h2>Details</h2>",
  notificationPage: "<h2>Notifications</h2>"
};

document.addEventListener("DOMContentLoaded", (event) => {
  console.log("init");
  facebook.initFacebook;
  let body = document.getElementsByTagName("body")[0];
  switch(body.id){
    case "INDEX":
      initIndex();
      break;
    case "ALL":
      console.log("check");
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

  let article = document.querySelector("#appInformation");
  let notifications = document.querySelector('#notifications');

  article.innerHTML = pages.createPage;
  notifications.addEventListener('click', function(){
    article.innerHTML = pages.notificationPage;
  });


}
