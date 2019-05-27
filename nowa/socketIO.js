const app = require('./expressApp');

const http = require('http').Server(app);
const io = require('socket.io')(http);

const sockets = {};

io.on('connection', (socket) => {
    console.log('a user connected!');
    socket.on('subscribe fight', (msg) => {
        // TODO remove from the other fight channel
        const {fightId} = msg;
        if (sockets[fightId]) {
            sockets[fightId].push(socket);
        }
        sockets[fightId] = [socket];
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


module.exports = {io, http, sockets};