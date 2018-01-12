/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var storage = window.localStorage;

document.addEventListener("DOMContentLoaded", function (event) {
  initFacebook();
  var body = document.getElementsByTagName("body")[0];
  switch (body.id) {
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
function initIndex() {

  var popup = document.getElementById("signup");
  var fbLogin = document.getElementsByClassName("loginBtn--facebook")[0];
  var signups = document.getElementsByClassName("startNow");
  var close = document.getElementsByClassName("close")[0];

  for (var i = 0; i < signups.length; i++) {

    signups[i].addEventListener("click", function (element) {
      popup.style.display = "block";
    });
  }

  close.addEventListener("click", function (element) {
    popup.style.display = "none";
  });

  window.addEventListener("click", function (element) {
    if (element.target == popup) {
      popup.style.display = "none";
    }
  });

  fbLogin.addEventListener("click", function () {
    FB.login(function (response) {
      if (response.status == "connected") {
        var accessToken = response.authResponse.accessToken;
        storage.setItem("nmct.facebook.accessToken", accessToken);
        createUser(accessToken);
      } else {
        window.location.href = "./index.html";
      }
    }, { scope: 'email, user_friends' });
  });

  if (storage.getItem("nmct.darem.user") != null && storage.getItem("nmct.facebook.accessToken") != null) {
    window.location.href = "./challenge.html";
  }
}

// CODE FOR CHALLENGE PAGE
function initChallenge() {
  loadAside();
}

// CODE FOR CHAT PAGE
function initChat() {
  loadAside();
}

function loadAside() {

  if (storage.getItem("nmct.darem.user") == null) {
    window.location.href = "./index.html";
  } else {
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
    logout.addEventListener("click", function () {
      FB.getLoginStatus(function (e) {
        if (e.authResponse) {
          storage.removeItem("nmct.darem.user");
          storage.removeItem("nmct.facebook.accessToken");
          window.location.href = "./index.html";
        } else {
          window.location.href = "./index.html";
        }
      });
    });

    // Show friends
    userObject.friends.forEach(function (friend) {
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
    if (userObject.challenges.length > 0) {
      userObject.challenges.forEach(function (challenge) {
        var divChallenge = document.createElement("div");
        div.className = "filler";
        divChallenges.appendChild(divChallenge);
      });
    } else {
      empty.innerHTML = "you currently have no challenges.";
    }
  }
}

//INIT FACEBOOK 
function initFacebook() {
  window.fbAsyncInit = function () {
    FB.init({
      appId: '398917810525601',
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v2.11'
    });
  };

  (function (d, s, id) {
    var js,
        fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk');
}

function createUser(accessToken) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      getUserData(xhr.responseText);
    }
  };
  xhr.open('POST', 'https://darem.herokuapp.com/users/auth/facebook/token?access_token=' + accessToken, true);
  xhr.send();
}

function getUserData(token) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      var myArr = JSON.parse(this.responseText);
      console.log(myArr[0]);
      storage.setItem("nmct.darem.user", JSON.stringify(myArr[0]));
      window.location.href = "./challenge.html";
    }
  };
  xhr.open('GET', 'http://projecthowest.herokuapp.com/users/userprofile?authToken=' + token, true);
  xhr.send();
}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);