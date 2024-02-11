const socketIo = require('socket.io');

const configureSocket = (server) => {

    const io = socketIo(server);

    io.on('connection', (socket) => {

    })
}

module.exports = configureSocket;