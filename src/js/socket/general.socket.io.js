var io = require('socket.io-client');
import Friend from '../models/friend.class';
import * as friendModule from '../module/friend.module';
import * as facebook from '../facebook/facebook';
import Notification from '../models/notification.class';
import * as inviteModule from '../module/invites.module';
import Challenge from "../models/challenge.class";
import {socketInit} from './socket.io.init';
import getInvites from '../getInvites';
import completedModule from '../module/isCompleted.module';
let socket;
let user;

let joinroom = sessionStorage.getItem('chatroom');
let currentRoom; // in welke room zit de gebruiker?
let userName;


export function initSockets() {
  socket = socketInit();
  user = JSON.parse(sessionStorage.getItem('nmct.darem.user'));
  return socket;
}

export function generalSocket() {
  socket.on('connect', function() {
    //registreer op je eigen room -> andere kunnen u een notificatie sturen
    socket.emit('room', sessionStorage.getItem('nmct.darem.accessTokenDB'));
    socket.emit('room', sessionStorage.getItem('nmct.darem.accessToken'));
    console.log("connected");
  });

  socket.on('joined room', function(data) {
    console.log(data);
    if (currentRoom != data.room && currentRoom != null) {
      socket.emit('leaveChatRoom', currentRoom);
    }
    currentRoom = data.room;
    userName = data.userName;
    console.log(userName);
    chatSpace.innerHTML = "";
  });

  socket.on('new user', function(data) {
    console.log(data);
  });

  socket.on('user left', function(data) {
    console.log(data.msg);
  });
  //////

  function updateUserData(data) {
    console.log("UPDATE");
    console.log(data.msg);

    sessionStorage.setItem("nmct.darem.user", data.user);
    let divFriends = document.getElementById("friends");
    divFriends.innerHTML = '';
    friendModule.ShowAddedFriends(divFriends, JSON.parse(sessionStorage.getItem("nmct.darem.user")).friends);
    facebook.initFacebook;
    FB.getLoginStatus(function(e) {
      if (sessionStorage.getItem('nmct.darem.user')) {
        getFriendsList();
      }
    });

  }

  function createNotification(name) {
    let notif = new Notification(name, "has added you as a friend");
    notif.RenderNotification();
  }

  function createChallengeNotification(name, challenge) {
    console.log(name);
    let notif = new Notification(name, "has invited you to " + challenge);
    notif.RenderNotification();
  }


  socket.on('room joined', function(data) {
    console.log(data);
  });

  socket.on('new friend', function(data) {
    updateUserData(data);
    if (data.msg != "no notification") {
      createNotification(data.msg);
    }
  });
  socket.on('new challenge', function(data) {
    updateChallengeData(data);
    if (data.msg != "no notification") {
      createChallengeNotification(data.msg, data.name);
    }
  });
  socket.on('update', function(data) {
    let userObject = JSON.parse(data.user);
    console.log(userObject);
    sessionStorage.setItem("nmct.darem.user", JSON.stringify(userObject));
    getInvites();
    updateChallengeData(data);
  });
  socket.on('completed', function(data){
    if(data.user != ""){
      sessionStorage.setItem("nmct.darem.user", data.user);
    }
    completedModule.completeChallenge(data.challenge);
  });
  let getFriendsList = function() {
    FB.api('/me/friends', function(response) {
      let obj = JSON.parse(sessionStorage.getItem('nmct.darem.user'));
      var newFriends = [];
      for (let i = 0; i < response.data.length; i++) {
        if (!JSON.stringify(obj.friends).includes(response.data[i].id)) {
          newFriends.push(response.data[i]);
        }
      }
      showInSidePanel(newFriends);

      function showInSidePanel(newFriends) {
        console.log("REFRESH!");
        let divNewFriends = document.getElementById("newFriends");
        friendModule.ShowNotAddedFriends(divNewFriends, newFriends);
      }
    });
  }

  function updateChallengeData(data) {
    let mark = document.getElementById("mark");
    let divChallenges = document.getElementById("yourChallenges");
    sessionStorage.setItem("nmct.darem.user", data.user);
    divChallenges.innerHTML = "";
    inviteModule.updateInvites(mark, JSON.parse(sessionStorage.getItem("nmct.darem.user")).challenges);
    ShowChallenges(divChallenges, JSON.parse(sessionStorage.getItem("nmct.darem.user")).acceptedChallenges);
  }

  function ShowChallenges(divChallenges, challenges) {
    let bobTheHTMLBuilder = "";
    console.log(challenges);
    challenges.forEach((challenge) => {
      let acceptedChallenge = new Challenge(challenge.name, challenge.description, challenge.category, challenge._id, "false", challenge.users, challenge.endDate);
      divChallenges.appendChild(acceptedChallenge.RenderChallenges(socket, user));
    });
  }
}

export function chatSocket() {
  /// CHAT
  //new user joined the room

  let message;
  let send;
  let sendPhoto;
  let chatSpace;
  let fileInput;

  message = document.getElementById('message');
  send = document.getElementById('sendMessage');
  sendPhoto = document.getElementById('sendPhoto');
  fileInput = document.getElementById('fileInput');
  chatSpace = document.getElementById('chatSpace');


  send.addEventListener('click', function() {
    socket.emit('send message', {
      joinedRoom: currentRoom,
      msg: message.value,
      user: userName,
      type: 'text'
    });
    message.value = ' ';
  });

  sendPhoto.addEventListener('click', function() {
    fileInput.click();
  });

  fileInput.addEventListener('change', function(evt) {
    for (var i = 0; i < evt.currentTarget.files.length; i++) {
      var file = evt.currentTarget.files[i];
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function(evt) {
        console.log("image send to backend");
        socket.emit('send image', {
          joinedRoom: currentRoom,
          msg: evt.target.result,
          user: userName,
          type: 'image'
        });
      };
    }
  })



  socket.on('new message', function(data) {
    if (currentRoom == data.room) {
      showMessage(data);
    }
  });

  socket.on('old messages', function(data) {
    for (let i = data.length - 1; i >= 0; i--) {
      showMessage(data[i]);
    }
  });

  socket.on('new image', function(data) {
    if (currentRoom == data.room) {
      showMessage(data);
    }
  });

  function showMessage(data) {
    console.log(data);
    if (data.type == 'text') {
      if (data.userName == userName) {
        chatSpace.innerHTML += '<div class="thisUser"><div><strong>' + "you say:</strong> " + data.msg + '</div></div>';
      } else {
        chatSpace.innerHTML += '<div class="otherUser"><div><strong>' + data.userName + " says:</strong> " + data.msg + '</div></div>';
      }
    } else {
      if (data.userName == userName) {
        chatSpace.innerHTML += '<div class="thisUser"><div class="sendImage"><img src="' + data.msg + '" class="well img"></div></div>';
      } else {
        chatSpace.innerHTML += '<div class="otherUser"><div class="sendImage"><img src="' + data.msg + '" class="well img"></div></div>';
      }
    }
  }
}
