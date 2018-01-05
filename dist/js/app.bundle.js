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
    authenticate();
  });

  function authenticate() {
    window.authenticateCallback = function (token) {
      var xmlhttp = new XMLHttpRequest();
      var url = "https://projecthowest.herokuapp.com/users/userprofile?authToken=" + token;
      xmlhttp.onreadystatechange = function () {
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
function initChallenge() {
  if (storage.getItem("nmct.darem.user") == null) {
    window.location.href = "./index.html";
  } else {
    var userString = storage.getItem("nmct.darem.user");
    var userObject = JSON.parse(userString);
    console.log(userObject);

    //SHOW USER INFO ON SCREEN
    var profilepic = document.getElementById("profilePic");
    var labelFirstName = document.getElementById("firstName");
    var lableLastName = document.getElementById("lastName");
    var labelEmail = document.getElementById("email");
    profilePic.src = userObject.facebook.photo;
    labelFirstName.innerHTML = userObject.givenName;
    lableLastName.innerHTML = userObject.familyName;
    labelEmail.innerHTML = userObject.email;
  }
}

// CODE FOR CHAT PAGE
function initChat() {
  console.log("chat");
}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);