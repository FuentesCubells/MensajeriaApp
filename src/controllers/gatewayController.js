require('dotenv').config();
const { response, request } = require('express');
const axios = require('axios');


const getData = async (request, response) => {
    try {
        const { username, email, password } = request.body;
        
        const endPointAuth = '/login';
        const headers = {
            'Content-Type': 'application/json',
        };
        const payload = {
            username: username || undefined,
            email: email || undefined,
            password: password || undefined,
        };
        
        const authResponse = await axios.post(`${process.env.USERS}${endPointAuth}`, payload, { headers });
        const userId = authResponse.data.user._id;

        const endPointMsg = `/conversations/all/${userId}`;
        const msgResponse = await axios.get(`${process.env.MSG}${endPointMsg}`);
        
        return response.status(200).json({
            user: authResponse.data,
            messages: msgResponse.data 
        });
    } catch (error) {
        const message = error.response?.data;
        return response.status(500).json({
            ok: false,
            info: 'Something went wrong',
            message: message
        });
    }
}


module.exports = {
    getData,
}
