const { Server } = require('socket.io');


const socketService = ( server ) => {

    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:4200',
            methods: ['GET', 'POST'],
            allowedHeaders: ['Content-Type'],
            credentials: true,
        }
    });

    io.on('connection', (socket) => {
        console.log(`Connected: ${socket.id}`);
    });
};

module.exports = socketService;