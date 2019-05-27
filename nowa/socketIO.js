const app = require('./expressApp');

const http = require('http').Server(app);
const io = require('socket.io')(http);

module.exports = io;