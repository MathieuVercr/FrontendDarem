
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

  /*(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://projecthowest.herokuapp.com/users/auth/facebook';
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));*/

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
    authenticate();
  });

  function authenticate() {
    window.authenticateCallback = function(token) {
      console.log(token);

      var xmlhttp = new XMLHttpRequest();
      var url = "https://projecthowest.herokuapp.com/userprofile?authToken=" + token;
      xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var myArr = JSON.parse(this.responseText);
          console.log(myArr);
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
  console.log("challenge");
}

// CODE FOR CHAT PAGE
function initChat(){
  console.log("chat");
}
