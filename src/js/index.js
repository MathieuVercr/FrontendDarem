
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
    window.location.href = "https://projecthowest.herokuapp.com/users/auth/facebook";
  });
}

// CODE FOR CHALLENGE PAGE
function initChallenge(){
  console.log("challenge");
}

// CODE FOR CHAT PAGE
function initChat(){
  console.log("chat");
}
