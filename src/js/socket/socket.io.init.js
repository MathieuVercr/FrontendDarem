var io = require('socket.io-client');

export function socketInit(){
	var socket = io.connect('http://projecthowest.herokuapp.com');

	return socket;
};
