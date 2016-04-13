# real-time-chat-with-nodejs-socket-io
##Buidling backend
#### Init socket io
```javascript
var io = require('socket.io').listen(app.listen(3001, function () {
	console.log('Socket io listening on port 3001!')
}));
```
#### Start listening new messages and send new messages to all clients
```javascript
io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'Ready to chat chit!'});
    socket.on('send', function (data) {
		console.log(data);		
        io.sockets.emit('message', data);
    });
});
```
#### Start server
*node app.js*
## Building frontend
```javascript
$(function () {
		var messages = [];
		var socket = io.connect('http://localhost:3001');
		socket.on('message', function (data) {
			data && data.username && $("#messages").append("<li><b>"+data.username+": </b>"+data.message+"</li>") 
			  || console.log(data);
		});
		$('#inputMsg').keypress(function(event){
			var keycode = (event.keyCode ? event.keyCode : event.which);
			if(keycode == '13'){
				//allow Shift+Enter to return line
				if(!event.shiftKey){
					var msg = $("#inputMsg").val().trim();
					(msg != '') && sendButtonClick(msg) && $("#content").scrollTop($("#content")[0].scrollHeight);
				}
			}
		});
		function sendButtonClick(msg) {
			var username = $("#username").val();
			if(!username){
				alert("Please enter your name!");
			}else {
				socket.emit('send', { message: msg, username: username });
				$("#inputMsg").val('');
			}
		};
});
```
## Captures
![Capture 1](/captures/capture-1.png)

![Capture 2](/captures/capture-2.png)
