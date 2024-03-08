require('dotenv').config();

const express = require('express');
const http = require('http');
const cors = require('cors');

const mongoose = require('./src/services/dbConection'); 

const app = express();
const server = http.createServer(app); 

const corsOptions = {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
