var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

paths = [];

app.use(express.static('public'));

app.get("/", function(req, res){
	req.render("index.html");
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.emit("connection", paths);

  socket.on('path', function(msg){
    paths.push(msg);
    socket.broadcast.emit('path', msg);
  });
});

http.listen(3000, function() {
	console.log("Listening on port 3000");
});