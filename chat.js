// Initialize socket
var socket = io();


// Submit function when click on send
function messageFunction(){
    var from = $("#user").val();
    var msg = $("#msg").val();
    if(msg != ''){
        socket.emit('chatMessage', from, msg);
    }
    $('#msg').val('').focus();
    return false;
}
socket.on('connect_failed', function() {
    document.write("Sorry, there seems to be an issue with the connection!");
})
// Notify user that there is ongoing typing
function notifyTyping(){
    var user = $("#user").val();
    socket.emit('notifyUser', user);
}

socket.on('chatMessage', function(from, msg){
    var me = $("#user").val();
    var color = (from == me)? 'green': 'orange';
    var from = (from == me)? 'Me': from;
    $("#messages").append('<li><strong style="color:'+color+'">'+ from +'</strong>:'+ msg +'</li>');
});

socket.on('notifyUser', function(user){
    var me = $("#user").val();
    if(user != me){
        $("#notifyUser").text(user+' is typing..');
    }
    setTimeout(function(){ $("#notifyUser").text(''), 10000});
});

$(document).ready(function(){
  var name = makeid();
  $('#user').val(name);
  // emit message on start
  socket.emit('chatMessage', 'System', '<b>' + name + '</b> has joined the discussion');
});

// generate random id for user
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for( var i=0; i < 5; i++ ) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
