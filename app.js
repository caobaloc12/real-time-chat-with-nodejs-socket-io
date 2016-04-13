var express = require('express');
var app = express();
var io = require('socket.io').listen(app.listen(3001, function () {
	console.log('Socket io listening on port 3001!')
}));

io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'Ready to chat chit!'});
    socket.on('send', function (data) {
		console.log(data);		
        io.sockets.emit('message', data);
    });
});