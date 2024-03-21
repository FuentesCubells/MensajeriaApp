require('dotenv').config();

const express = require('express');
const http = require('http');
const cors = require('cors');
const userRouter = require('./src/routes/userRoutes');

const mongoose = require('./src/services/dbConection'); 

const app = express();
const server = http.createServer(app); 

const corsOptions = {
    origin: 'http://localhost:3003',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use('/user', userRouter);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
