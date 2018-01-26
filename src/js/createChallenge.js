import challengeModule from './module/challenge.module';
import * as validate from './module/validation.module';
import Challenge from './models/challenge.class';
import {socket} from './socket/general.socket.io';


let createChallenge = function() {
  //INPUT fields
  let creatorId = sessionStorage.getItem("nmct.darem.accessToken");
  let name = document.getElementById('name');
  let description = document.getElementById('description');
  let endDate = document.getElementById('enddate');
  let submit = document.getElementById('submit');
  let allFriends = JSON.parse(sessionStorage.getItem('nmct.darem.user')).friends;
  let friends = document.getElementById('addFriendToChallenge');
  let category = document.getElementById('addCategoryToChallenge');
  let selFriends = [];
  endDate.setAttribute("min", new Date().toISOString().split('T')[0]);

  //2 lijsten opvullen met data
  fillListFriends();
  fillListCategories();

  name.addEventListener('input', function() {
    let bool = validate.checkName(this);
    color(this, bool);
  });

  description.addEventListener('input', function() {
    let bool = validate.checkDescription(this);
    color(this, bool);
  });

  endDate.addEventListener('input', function() {
    let bool = validate.checkDate(this);
    color(this, bool);
  });

  friends.addEventListener("change", function() {
    let bool = validate.checkFriends(this);
    color(this, bool);
  });

  category.addEventListener('change', function(){
    let bool = validate.checkCategory(this);
    color(this, bool);
  });


  submit.addEventListener('click', function(evt) {
    for (var i = 0; i < friends.options.length; i++) {
      if (friends.options[i].selected == true) {
        selFriends.push(friends.options[i].value);
      }
    }

    console.log(selFriends);
    if (!validate.enable(name, description, endDate, friends, category)) {
      let challenge = new Challenge(name.value, description.value, category.value, creatorId, "false", selFriends, Date.parse(endDate.value));
      challenge.sendPost(name, description, endDate, friends, category, selFriends);
    }
  });


  function color(e, result) {
    if (result === true) {
      e.classList.remove('invalid');
      e.classList.add('valid');
    } else {
      e.classList.remove('valid');
      e.classList.add('invalid');
    }
    submit.disabled = validate.enable(name, description, endDate, friends, category);
    if (!submit.disabled) {
      submit.classList.remove('submit-invalid');
      submit.classList.add('submit-valid');
    } else {
      submit.classList.remove('submit-valid');
      submit.classList.add('submit-invalid');
    }
  }

  function fillListFriends(){
    let choiceArray = [];
    for (let friend in allFriends) {
      let object = {
        value: allFriends[friend].databaseid,
        label: `<img src=https://graph.facebook.com/v2.6/${allFriends[friend].id}/picture?type=large class=image_list--selected />` + `<p style="margin-bottom: auto;margin-top: auto;">${allFriends[friend].name}</p>`
      }
      choiceArray.push(object);
    }

    let friendslist = new Choices('#addFriendToChallenge', {
      removeItemButton: true,
      choices: choiceArray,
      classNames: {
        listItems: 'choices__list--multiple',
        itemSelectable: 'choices__item--selectable'
      }
    });
  }

  function fillListCategories(){
    let categories = challengeModule.getCategories();
    let choiceArray = [];
    for (let category in categories) {
      let object = {
        value: categories[category],
        label: categories[category]
      }
      choiceArray.push(object);
    }

    let categoriesList = new Choices('#addCategoryToChallenge', {
      removeItemButton: true,
      choices: choiceArray,
      classNames: {
        itemSelectable: 'choices__item--selectable'
      }
    });
  }
};

module.exports = createChallenge;
