let io;

const init = (socketIo) => io = socketIo;

const emit = (user, status) => io.emit('pomodoro', { user, status: +status });

module.exports = {
    init,
    emit
};