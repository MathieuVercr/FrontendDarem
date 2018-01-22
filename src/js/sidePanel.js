import challengeModule from './module/challenge.module';
import * as friendModule from './module/friend.module';
import Friend from './models/friend.class';
import { socket } from './socket/general.socket.io';
import * as articleContent from './showArticle';


var sidePanel = function() {
  let storage = window.sessionStorage;
  if (storage.getItem("nmct.darem.user") == null) {
    //window.location.href = "./index.html";
  } else {
		socket();
    var userString = storage.getItem("nmct.darem.user");
    var userObject = JSON.parse(userString);
    console.log(userObject);

    /*** SHOW USER INFO ON SCREEN ***/
    // Get HTML elements
    var profilepic = document.getElementById("profilePic");
    var labelFirstName = document.getElementById("firstName");
    var lableLastName = document.getElementById("lastName");
    var labelEmail = document.getElementById("email");
    var divFriends = document.getElementById("friends");
    var divChallenges = document.getElementById("yourChallenges");
    var empty = document.getElementById("noChallenges");
    var logout = document.getElementById("logout");

    // Show profile info
    profilePic.src = userObject.facebook.photo;
    labelFirstName.innerHTML = userObject.givenName;
    lableLastName.innerHTML = userObject.familyName;
    labelEmail.innerHTML = userObject.email;
    logout.addEventListener("click", () => {
      FB.getLoginStatus(function(e) {
        if (e.authResponse) {
          FB.logout(function(response) {
            storage.removeItem("nmct.darem.user");
            storage.removeItem("nmct.facebook.accessToken");
						storage.removeItem("nmct.facebook.accessTokenDB");
            window.location.href = "./index.html";
          });
        } else {
          window.location.href = "./index.html";
        }
      });
    });

    // Show friends
    friendModule.ShowAddedFriends(divFriends, userObject.friends);

    // Show challenges
    if (userObject.acceptedChallenges.length > 0) {
      userObject.acceptedChallenges.forEach((challenge) => {
        let bobTheHTMLBuilder = "";
        var divChallenge = document.createElement("div");
        divChallenge.setAttribute('tag', challenge._id);
        bobTheHTMLBuilder += `<img src="./assets/images/${challenge.category.toLowerCase()}.png"></img>`;
        bobTheHTMLBuilder += `<div class="challenge__detail"><p>${challenge.name}</p>`;
        bobTheHTMLBuilder += `<p>${challenge.description}</p></div>`;
        divChallenge.innerHTML = bobTheHTMLBuilder;
        divChallenge.className = "challenge filler";

        divChallenge.addEventListener('click', function(e) {
          challengeModule.getChallengeData(e.target.attributes.tag.nodeValue).then(function(response) {
            let bobTheHTMLBuilder = "";
            bobTheHTMLBuilder += `<h2>${response.name}</h2>`;
            bobTheHTMLBuilder += `<p>${response.description}</p>`;
            bobTheHTMLBuilder += `<div>`;
            console.log(response.acceptedUsers.length);
            for(let i = 0; i < response.acceptedUsers.length; i++){
              bobTheHTMLBuilder += `<img src="https://graph.facebook.com/v2.6/${response.acceptedUsers[i].facebook.id}/picture?type=large"></img>`
            }
            bobTheHTMLBuilder += `</div>`;
            let detail = document.getElementById("challenge");
            detail.innerHTML = bobTheHTMLBuilder;
            console.log(response);
            articleContent.initDetails(response);
          });
        });

        divChallenges.appendChild(divChallenge);
      });
    } else {
      console.log(userObject);
      empty.innerHTML = "you currently have no challenges.";
    }
  }
};

module.exports = sidePanel;
