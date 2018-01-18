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
		sessionStorage.setItem("nmct.darem.user", data);
		let divFriends = document.getElementById("friends");
		divFriends.innerHTML = '';
		friendModule.ShowAddedFriends(divFriends, JSON.parse(sessionStorage.getItem("nmct.darem.user")).friends);
	}
};
