var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

//Initialize chat app
app.get('/', function(req, res){
    var express =require('express');
    app.use(express.static(path.join(__dirname)));
    res.sendFile(path.join(__dirname, '../chatbot', 'index.html'));
});

// Save events on socket io
io.on('connection', function(socket){
    socket.on('chatMessage', function(from, msg){
        io.emit('chatMessage', from, msg);
    });
    socket.on('notifyUser', function(user){
        io.emit('notifyUser', user);
    });
});

// Listen on port 3000
http.listen(3000, function(){
    console.log('listening on *:3000');
});

io.on('connect_failed', function() {
    document.write("Sorry, there seems to be an issue with the connection!");
})