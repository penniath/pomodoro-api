const CONSTANTS = require('../constants');
const eventService = require('./event-service');

const status = {
    'ibai': CONSTANTS.IDLE,
    'gonzalo': CONSTANTS.IDLE,
    'fran': CONSTANTS.IDLE
};

const setStatus = (user, newStatus) => {
    status[user] = newStatus;
    eventService.send(user, newStatus);
};

const getStatus = () => status;

const updateToAlmostDone = (user) => () => setStatus(user, CONSTANTS.ALMOST_DONE);

const updateToIdle = (user) => () => setStatus(user, CONSTANTS.IDLE);

const start = (user) => {
    setStatus(user, CONSTANTS.BUSY);
    setTimeout(updateToAlmostDone(user), CONSTANTS.ALMOST_DONE_MILLIS);
    setTimeout(updateToIdle(user), CONSTANTS.DONE_MILLIS);    
};

module.exports = { start, getStatus };
