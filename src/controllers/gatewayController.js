require('dotenv').config();
const { response, request } = require('express');
const axios = require('axios');

//AUTH
//Gets the login done and returns the user and the messages
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

const postRegister = async ( request, response ) => {
    try {
        const { username, email, password, telf } = request.body;
        
        const endPointAuth = '/register';
        const headers = {
            'Content-Type': 'application/json',
        };
        const payload = {
            username: username || undefined,
            email: email || undefined,
            password: password || undefined,
            telf: telf || undefined
        };
        
        const rgstrResponse = await axios.post(`${process.env.USERS}${endPointAuth}`, payload, { headers });
        const rspns = rgstrResponse.data
        return response.status(200).json({
            rspns
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

const putUser = async (request, response) => {
    try {
        const { id, username, email, password, telf } = request.body;

        const endPointEdit = '/edit';
        const headers = {
            'Content-Type': 'application/json',
            'x-token': request.headers['x-token']
        };
        const payload = {
            username: username || undefined,
            email: email || undefined,
            password: password || undefined,
            telf: telf || undefined
        };
        
        const editResponse = await axios.put(`${process.env.USERS}${endPointEdit}/${id}`, payload, { headers });
        const rspns = editResponse.data
        return response.status(200).json({
            rspns
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

const deleteUser = async (request, response) => {
    try {
        const { id, username, email, password } = request.body;
      
        const endPointDelete = '/delete';
        const headers = {
            'Content-Type': 'application/json',
            'x-token': request.headers['x-token']
        };
        const payload = {
            username: username || undefined,
            email: email || undefined,
            password: password || undefined,
        };
        
        const dltResponse = await axios.post(`${process.env.USERS}${endPointDelete}/${id}`, payload, { headers });
        const rspns = dltResponse.data
        return response.status(200).json({
            rspns
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

//MSG
const getMsg = async ( request, response ) => {
    try {
        const { userId, conversationId } = request.body;
      
        const endPointMsg = `/conversations/one/${userId}`;
        // const headers = {
        //     'Content-Type': 'application/json',
        //     'x-token': request.headers['x-token']
        // };
        const payload = {
            conversationId: conversationId || undefined,
        };
        console.log(endPointMsg)
        const msgResponse = await axios.get(`${process.env.MSG}${endPointMsg}`, payload);
        const rspns = msgResponse.data
        return response.status(200).json({
            rspns
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
const sendMsg = async ( request, response ) => {
    try {
        const { userId, conversationId, text } = request.body;
      
        const endPointMsg = `/messages/send/${userId}`;
        const headers = {
            'Content-Type': 'application/json',
            // 'x-token': request.headers['x-token']
        };
        const payload = {
            text: text,
            conversationId: conversationId || undefined,
        };
        
        const msgResponse = await axios.post(`${process.env.MSG}${endPointMsg}`, payload, {headers});
        const rspns = msgResponse.data
        return response.status(200).json({
            rspns
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
const postConversation = async (request, response) => {
    try {
        const { userId, title } = request.body;
      
        const endPointMsg = `/conversations/new/${userId}`;
        const headers = {
            'Content-Type': 'application/json',
            // 'x-token': request.headers['x-token']
        };
        const payload = {
            title: title,
        };
        
        const msgResponse = await axios.post(`${process.env.MSG}${endPointMsg}`, payload, {headers});
        const rspns = msgResponse.data
        return response.status(200).json({
            rspns
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
const dltConversation = async (request, response) => {
    try {
        const { userId, conversationId } = request.body;
        
        const endPointMsg = `/conversations/delete/${userId}`;
        const headers = {
            'Content-Type': 'application/json',
            // 'x-token': request.headers['x-token']
        };
        const payload = {
            conversationId: conversationId
        }
        
        const dltCnvResponse = await axios.post(`${process.env.MSG}${endPointMsg}`, payload, {headers});
        const rspns = dltCnvResponse.data
        return response.status(200).json({
            rspns
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
    postRegister,
    putUser,
    deleteUser,
    getMsg,
    sendMsg,
    postConversation,
    dltConversation
}
