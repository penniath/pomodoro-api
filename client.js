var socket = require('socket.io-client')('http://192.168.1.42:3000');
socket.on('connect', function(){
  console.log('connected');
});
socket.on('pomodoro', function(data){
  console.log(data);
});
socket.on('disconnect', function(){
  console.log('disconnect');
});