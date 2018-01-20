import challengeModule from './module/challenge.module';
import * as friendModule from './module/friend.module';
import Friend from './models/friend.class';
import { socket } from './socket/general.socket.io';


var sidePanel = function() {
  let storage = window.sessionStorage;
  if (storage.getItem("nmct.darem.user") == null) {
    window.location.href = "./index.html";
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
            var date = new Date(parseInt(response.endDate));
            console.log(date);
            var bobTheHTMLBuilder = "";
            bobTheHTMLBuilder += '<img id="detailCategory" src="./assets/images/' + response.category.toLowerCase() + '.png"></img>';
            bobTheHTMLBuilder += '<div class="challengeDetail">';
            bobTheHTMLBuilder += '<h2>' + response.name.toUpperCase() + '</h2>';
            bobTheHTMLBuilder += '<p><strong>Here are your rules </strong>' + response.description + '</p>';
            bobTheHTMLBuilder += '<p><strong>You need to finish before </strong>' + date.getDay() + '/' + (date.getMonth()+1) + '/' + date.getFullYear() + '</p>';
            bobTheHTMLBuilder += '</div>';
            bobTheHTMLBuilder += '<div class="friendsDetail">';
            console.log(response.acceptedUsers.length);
            for (var i = 0; i < response.acceptedUsers.length; i++) {
              bobTheHTMLBuilder += '<img src="https://graph.facebook.com/v2.6/' + response.acceptedUsers[i].facebook.id + '/picture?type=large"></img>';
            }
            bobTheHTMLBuilder += '</div>';
            bobTheHTMLBuilder += '<button type="submit" id="btnChat">Go and talk about the challenge</button>'
            var detail = document.getElementById("createChallenge");
            detail.innerHTML = bobTheHTMLBuilder;
            console.log(response);
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
