var io = require('socket.io-client');
import Friend from '../models/friend.class';
import * as friendModule from '../module/friend.module';
import * as facebook from '../facebook/facebook';

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
	});

	function updateUserData(data){
		console.log("UPDATE")
		sessionStorage.setItem("nmct.darem.user", data.userOne);
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
