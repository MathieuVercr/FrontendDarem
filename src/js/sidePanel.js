import challengeModule from './module/challenge.module';

var sidePanel = function(){
	let storage = window.sessionStorage;

  	if(storage.getItem("nmct.darem.user")==null){
    	window.location.href = "./index.html";
  	}else{
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
	      FB.getLoginStatus(function(e){
	        if(e.authResponse){
	          FB.logout(function(response){
	            storage.removeItem("nmct.darem.user");
	            storage.removeItem("nmct.facebook.accessToken");
	            window.location.href = "./index.html";
	          });
	        }else{
	          window.location.href = "./index.html";
	        }
	      });
	    });

	    // Show friends
	    userObject.friends.forEach((friend) => {
	      var divImg = document.createElement("div");
	      divImg.className = "tooltip";
	      var img = document.createElement("img");
	      img.src = friend.photo;
	      var tooltiptext = document.createElement("span");
	      tooltiptext.className = "tooltiptext";
	      tooltiptext.innerHTML = friend.name;
	      divImg.appendChild(img);
	      divImg.appendChild(tooltiptext);
	      divFriends.appendChild(divImg);
	    });

	    // Show challenges
	    if(userObject.acceptedChallenges.length > 0){
	      userObject.acceptedChallenges.forEach((challenge) => {
	      	let bobTheHTMLBuilder = "";
	        var divChallenge = document.createElement("div");
	        divChallenge.setAttribute('tag', challenge._id);
	        bobTheHTMLBuilder += `<img src="../dist/assets/images/${challenge.category}.png"></img>`;
	        bobTheHTMLBuilder += `<div class="challenge__detail"><p>${challenge.name}</p>`;
	        bobTheHTMLBuilder += `<p>${challenge.description}</p></div>`;
	        divChallenge.innerHTML = bobTheHTMLBuilder;
	        divChallenge.className = "challenge filler";

	        divChallenge.addEventListener('click', function(e) {
	        	challengeModule.getChallengeData(e.target.attributes.tag.nodeValue);
	        });

	        divChallenges.appendChild(divChallenge);
	      });
	    }else{
	      console.log(userObject);
	      empty.innerHTML = "you currently have no challenges.";
	    }

  }
};

module.exports = sidePanel;