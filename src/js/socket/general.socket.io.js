var io = require('socket.io-client');
import Friend from '../models/friend.class';
import * as friendModule from '../module/friend.module';
import * as facebook from '../facebook/facebook';
import Notification from '../models/notification.class';
import * as inviteModule from '../module/invites.module';
import Challenge from "../models/challenge.class";

export function socket(){
	var socket = io.connect('http://projecthowest.herokuapp.com');
	socket.on('connect', function() {
    //registreer op je eigen room -> andere kunnen u een notificatie sturen
    socket.emit('room', sessionStorage.getItem('nmct.darem.accessTokenDB'));
		socket.emit('room', sessionStorage.getItem('nmct.darem.accessToken'));
  });

	socket.on('room joined', function(data) {
		console.log(data);
	});

	socket.on('new friend', function(data){
		updateUserData(data);
		if(data.msg != "no notification"){
			createNotification(data.msg);
		}
	});
	socket.on('new challenge', function(data){
		updateChallengeData(data);
		if(data.msg != "no notification"){
			createChallengeNotification(data.msg, data.name);
		}
	});
	function updateChallengeData(data){
		let mark = document.getElementById("mark");
		let divChallenges = document.getElementById("yourChallenges");
		sessionStorage.setItem("nmct.darem.user", data.user);
		divChallenges.innerHTML = "";
		inviteModule.updateInvites(mark, JSON.parse(sessionStorage.getItem("nmct.darem.user")).challenges);
		ShowChallenges(divChallenges, JSON.parse(sessionStorage.getItem("nmct.darem.user")).acceptedChallenges);
	}
	function ShowChallenges(divChallenges, challenges){
		let bobTheHTMLBuilder = "";
		console.log(challenges);
		challenges.forEach((challenge)=>{
		  let acceptedChallenge = new Challenge(challenge.name, challenge.description, challenge.category, challenge._id, "false", challenge.users, challenge.endDate);
		  divChallenges.appendChild(acceptedChallenge.RenderChallenges());
		});
	  }
	function updateUserData(data){
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
	function createNotification(name){
		let notif = new Notification(name, "has added you as a friend");
		notif.RenderNotification();
	}
	function createChallengeNotification(name, challenge){
		console.log(name);
		let notif = new Notification(name, "has invited you to " + challenge);
		notif.RenderNotification();
	}

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
	};
};
