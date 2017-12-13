(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = 'https://boiling-dawn-34823.herokuapp.com/users/auth/facebook';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// SHOW AND HIDE POPUP

document.addEventListener("DOMContentLoaded", (event) => {

  var popup = document.getElementById("signup");
  var fbLogin = document.getElementsByClassName("loginBtn--facebook")[0];

  var signups = document.getElementsByClassName("startNow");
  for(var i=0; i<signups.length; i++){

    signups[i].addEventListener("click", (element) => {
      popup.style.display = "block";
    });

  }

  var close = document.getElementsByClassName("close")[0];
  close.addEventListener("click", (element) => {
    popup.style.display = "none";
  });

  window.addEventListener("click", (element) => {
    if (element.target == popup) {
        popup.style.display = "none";
    }
  });

  fbLogin.addEventListener("click", () => {
    window.location.href = "https://boiling-dawn-34823.herokuapp.com/users/auth/facebook";
  });
});
