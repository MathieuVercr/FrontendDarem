var storage = window.localStorage;

document.addEventListener("DOMContentLoaded", (event) => {

  let body = document.getElementsByTagName("body")[0];
  switch(body.id){
    case "INDEX":
      initIndex();
      break;
    case "CHALLENGE":
      initChallenge();
      break;
    case "CHAT":
      initChat();
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
    if(storage.getItem("nmct.darem.user")==null){
      authenticate();
    }else{
      window.location.href = "./challenge.html";
    }
  });

  function authenticate() {
    window.authenticateCallback = function(token) {
      var xmlhttp = new XMLHttpRequest();
      var url = "https://projecthowest.herokuapp.com/users/userprofile?authToken=" + token;
      xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var myArr = JSON.parse(this.responseText);
          console.log(myArr[0]);
          storage.setItem("nmct.darem.user", JSON.stringify(myArr[0]));
          window.location.href = "./challenge.html";
        }
      };
      xmlhttp.open("GET", url, true);
      xmlhttp.send();
    };

    window.open('https://projecthowest.herokuapp.com/users/auth/facebook');
  }
}

// CODE FOR CHALLENGE PAGE
function initChallenge(){
  loadAside();
}

// CODE FOR CHAT PAGE
function initChat(){
  loadAside();
}

function loadAside(){

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
      storage.removeItem("nmct.darem.user");
      window.location.href = "./index.html";
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
    if(userObject.challenges.length > 0){
      userObject.challenges.forEach((challenge) => {
        var divChallenge = document.createElement("div");
        div.className = "filler";
        divChallenges.appendChild(divChallenge);
      });
    }else{
      empty.innerHTML = "you currently have no challenges.";
    }

  }
}
