const { response } = require('express');
const Messages = require('../models/messageModel');


const getMessages = async ( request, response ) => {
    try {
        const id = request.query.conversationId; 
        const messages = await Messages.find( {conversation_id: id} );
       
        response.status(200).json( {
            info : messages.length === 0 ? 'No tienes mensajes' : 'Tus mensajes',
            messages: messages
        } );

    } catch (error) {
        response.status(500).json( {error: error.message })
    }
}

const postMessage = async (request, response) => {
    try {
        const user_id = request.params.userId;
        const conversationId = request.body.conversationId;
        const text = request.body.text;
        const newMessage = new Messages ({
            text, 
            conversation_id: conversationId,
            user_id: user_id
        })
        
        await newMessage.save();

        //Buscar el id del mensaje nuevo, si existe modificar el mensaje devuelto (info).
        const saved = await Messages.findById(newMessage._id)

        response.status(200).json( {
            info :  saved.id ? 'Saved Message' : 'Error',
            messages: saved
        });

    } catch (error) {
        response.status(500).json( {error: error.message })
    }
}

module.exports = {
    getMessages,
    postMessage
}