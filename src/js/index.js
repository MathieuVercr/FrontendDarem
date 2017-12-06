// SHOW AND HIDE POPUP

document.addEventListener("DOMContentLoaded", (event) => {

  var popup = document.getElementById("signup");

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
});
