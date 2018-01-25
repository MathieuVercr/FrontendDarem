import challengeModule from './module/challenge.module';
import * as friendModule from './module/friend.module';
import Friend from './models/friend.class';
import * as GeneralSockets from './socket/general.socket.io';
import * as articleContent from './showArticle';
import Challenge from './models/challenge.class';
import * as inviteModule from './module/invites.module';

let sidePanel = function() {
  let storage = window.sessionStorage;
  let socket = GeneralSockets.initSockets();
  GeneralSockets.generalSocket();
  if (storage.getItem("nmct.darem.user") == null) {
    //window.location.href = "./index.html";
  } else {
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
        let acceptedChallenge = new Challenge(challenge.name, challenge.description, challenge.category, challenge._id, "false", "", "");
        divChallenges.appendChild(acceptedChallenge.RenderChallenges(socket, userObject));
      });
    } else {
      empty.innerHTML = "you currently have no challenges.";
    }

    //show invites
    let invites = userObject.challenges;
    inviteModule.updateInvites(mark, invites);

  }
};

module.exports = sidePanel;
