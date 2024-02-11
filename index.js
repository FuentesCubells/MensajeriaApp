require('dotenv').config();

const express = require('express');
const http = require('http');
const configureSocket = require('./services/socketService');
// const listEndpoints = require('express-list-endpoints');
const messagesRouter = require('./src/routes/messageRoutes');
const conversationRouter = require('./src/routes/conversationRoutes')

const app = express();
const server = http.createServer( app );
configureSocket( server );

app.use( express.json() );

app.use('/api/messages', messagesRouter);
app.use('/api/conversations', conversationRouter);

// console.log(listEndpoints(app)); //Solo para dev

const PORT = process.env.PORT || 3000 
app.listen( PORT, () => {
    console.log('Server running')
})