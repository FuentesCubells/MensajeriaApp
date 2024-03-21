require('dotenv').config();

const express = require('express');
const http = require('http');
const cors = require('cors');
const io = require('./src/services/socketService');
const messagesRouter = require('./src/routes/messageRoutes');
const conversationRouter = require('./src/routes/conversationRoutes');
const listEndpoints = require('express-list-endpoints');

const app = express();
const server = http.createServer(app); 
io(server);

const corsOptions = {
    origin: 'http://localhost:3003',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
    res.send(listEndpoints(app)); 
});
  
app.use('/api/messages', messagesRouter);
app.use('/api/conversations', conversationRouter);


//console.log(listEndpoints(app)); //Solo para dev

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
