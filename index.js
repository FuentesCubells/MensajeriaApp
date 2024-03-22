require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const http = require('http');
const cors = require('cors');
const gatewayRouter = require('./src/routes/gateway')

const app = express();
const server = http.createServer(app);
const corsOptions = {
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
};
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use('/gateway/', gatewayRouter )

const PORT = process.env.PORT || 3003;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});