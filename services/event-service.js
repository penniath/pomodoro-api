const CONSTANTS = require('../constants');
const mqtt = require('mqtt')
const client  = mqtt.connect(CONSTANTS.MOSQUITTO_URL);
const socketService = require('./socket-service');

const send = (user, status) =>   client.publish(`/pomodoro/${ user }`, `${ status }`, { retain: true });

client.on('connect', () => {
    client.subscribe('/pomodoro/+');
    client.subscribe('/start/+');
});

client.on('message', (topic, message) => {
    const [_, action, user] = topic.split('/');
    if (action === 'pomodoro') {
        socketService.emit(user, message.toString());
    } else {
        send(user, CONSTANTS.BUSY);
        setTimeout(() => send(user, CONSTANTS.ALMOST_DONE), CONSTANTS.ALMOST_DONE_MILLIS);
        setTimeout(() => send(user, CONSTANTS.IDLE), CONSTANTS.DONE_MILLIS);    
    }
});

module.exports = { send };