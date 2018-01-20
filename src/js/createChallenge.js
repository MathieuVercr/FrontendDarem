import challengeModule from './module/challenge.module';
import * as validate from './module/validation.module';
import Challenge from './models/challenge.class';
import {
  socket
} from './socket/general.socket.io';


let createChallenge = function() {
  //INPUT fields
  let creatorId = sessionStorage.getItem("nmct.darem.accessToken");
  let name = document.getElementById('name');
  let description = document.getElementById('description');
  let endDate = document.getElementById('enddate');
  let submit = document.getElementById('submit');

  name.addEventListener('input', function(evt) {
    let bool = validate.checkName(this);
    color(this, bool);
  });

  description.addEventListener('input', function(evt) {
    let bool = validate.checkDescription(this);
    color(this, bool);
  });

  endDate.addEventListener('input', function(evt) {
    let bool = validate.checkDate(this);
    color(this, bool);
  });

  submit.addEventListener('click', function(evt){
    if(!validate.enable(name, description, endDate)){
      let challenge = new Challenge(name.value, description.value, "Running", creatorId, "false", ["5a4f9c135ac2cf00147c1efc"], "5678765678");
      challenge.sendPost();
    }
  });

  function color(e, result) {
    if (result === true) {
      e.style.borderColor = "green";
    } else {
      e.style.borderColor = "red";
    }
    submit.disabled = validate.enable(name, description, endDate);
  }
};

module.exports = createChallenge;
