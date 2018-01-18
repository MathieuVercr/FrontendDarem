var io = require('socket.io-client');
import Friend from '../models/friend.class';
import * as facebook from './facebook/facebook';

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
		console.log(data);
		sessionStorage.setItem("nmct.darem.user", data);
		let divFriends = document.getElementById("friends");
		divFriends.innerHTML = '';
		JSON.parse(sessionStorage.getItem("nmct.darem.user")).friends.forEach((friendItem) => {
			let friend = new Friend(friendItem.name, friendItem.photo, friendItem.id);
			friend.RenderAddedFriendHTML(divFriends);
		});
		facebook.initFacebook;
	}
};
