const express = require('express');
const statusService = require('./services/status-service');
const bodyParser = require('body-parser')

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
require('./services/socket-service').init(io);

io.on('connect', client => client.emit('pomodoro:users', statusService.getStatus()));

app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/start', (req, res) => {
    statusService.start(req.body.user);
    res.send({})
    res.sendStatus(200);
});

http.listen(3000, () => console.log('Example app listening on port 3000!'));
