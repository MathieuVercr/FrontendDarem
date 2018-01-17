var io = require('socket.io-client');
export function socket(){
	var socket = io.connect('http://projecthowest.herokuapp.com');
	socket.on('connect', function() {
    //registreer op je eigen room -> andere kunnen u een notificatie sturen
    socket.emit('room', sessionStorage.getItem('nmct.darem.accessTokenDB'));
  });

  socket.on('room joined', function(data) {
    console.log(data);
  });
};
