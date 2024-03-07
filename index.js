require('dotenv').config();

const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io'); // Importa Server desde 'socket.io' correctamente
const messagesRouter = require('./src/routes/messageRoutes');
const conversationRouter = require('./src/routes/conversationRoutes');
const listEndpoints = require('express-list-endpoints');

const app = express();
const server = http.createServer(app); 
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:4200',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type'],
        credentials: true, // Habilita el uso de cookies en solicitudes CORS
    }
});

const corsOptions = {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true, // Habilita el uso de cookies en solicitudes CORS
};
app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
    res.send(listEndpoints(app)); 
});
  
app.use('/api/messages', messagesRouter);
app.use('/api/conversations', conversationRouter);

io.on('connection', (socket) => {
    console.log(`Connected: ${socket.id}`);
});
//console.log(listEndpoints(app)); //Solo para dev

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
