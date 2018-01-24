import challengeModule from './module/challenge.module';
import * as friendModule from './module/friend.module';
import Friend from './models/friend.class';
import { socket } from './socket/general.socket.io';
import * as articleContent from './showArticle';
import challenge from './models/challenge.class';
import * as inviteModule from './module/invites.module';

let sidePanel = function() {
  let storage = window.sessionStorage;
  if (storage.getItem("nmct.darem.user") == null) {
    //window.location.href = "./index.html";
  } else {
		socket();
    let userString = storage.getItem("nmct.darem.user");
    let userObject = JSON.parse(userString);
    console.log(userObject);

    /*** SHOW USER INFO ON SCREEN ***/
    // Get HTML elements
    let profilepic = document.getElementById("profilePic");
    let labelFullName = document.getElementById("fullname");
    let labelEmail = document.getElementById("email");
    let divFriends = document.getElementById("friends");
    let divChallenges = document.getElementById("yourChallenges");
    let empty = document.getElementById("noChallenges");
    let logout = document.getElementById("logout");
    let showChallengePage = document.getElementById('showChallengePage');
    let mark = document.getElementById("mark");
    // Show profile info
    profilePic.src = userObject.facebook.photo;
    labelFullName.innerHTML = userObject.givenName + " " + userObject.familyName;
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

    // Show challenge page
    showChallengePage.addEventListener('click', () => {
      articleContent.initCreate();
    })

    // Show challenges
    if (userObject.acceptedChallenges.length > 0) {
      userObject.acceptedChallenges.forEach((challenge) => {
        let bobTheHTMLBuilder = "";
        let divChallenge = document.createElement("div");
        divChallenge.setAttribute('tag', challenge._id);
        bobTheHTMLBuilder += `<img src="./assets/images/${challenge.category.toLowerCase()}.png">`;
        bobTheHTMLBuilder += `<div class="challenge__detail"><p>${challenge.name}</p>`;
        bobTheHTMLBuilder += `<p>${challenge.description}</p></div>`;
        divChallenge.innerHTML = bobTheHTMLBuilder;
        divChallenge.className = "challenge";

        divChallenge.addEventListener('click', function(e) {
          challengeModule.getChallengeData(e.target.attributes.tag.nodeValue).then(function(response) {
            articleContent.initDetails(response);
          });
        });

        divChallenges.appendChild(divChallenge);
      });
    } else {
      console.log(userObject);
      empty.innerHTML = "you currently have no challenges.";
    }

    //show invites
    let invites = userObject.challenges;
    inviteModule.updateInvites(mark, invites);
    
  }
};

module.exports = sidePanel;
