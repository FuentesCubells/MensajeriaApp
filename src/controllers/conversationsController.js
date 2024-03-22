const { response } = require('express');
const Conversations = require('../models/conversationModel');
const Messages = require('../models/messageModel');

const getConversations = async (request, response) => {
    try {
        const user_id = request.params.userId;

        const conversations = await Conversations.find({ user_id: user_id });
        for (const conversation of conversations) {
            const messages = await Messages.find({ conversation_id: conversation._id });
            conversation.messages = messages;
        }

        response.status(200).json({
            info: conversations.length === 0 ? 'No tienes conversaciones' : 'Tus Conversaciones',
            conversations: conversations
        });
    } catch (error) {
        return response.status(500).json({
            ok: false,
            info: 'Something went wrong',
            message: error.message
        });
    }
}

const getConversation = async (request, response) => {
    try {
        const user_id = request.params.userId;
        const conversation_id = request.query.conversationId;

        const conversation = await Conversations.findOne({ user_id: user_id });
        const messages = await Messages.find({ conversation_id: conversation_id })

        conversation.messages = messages;

        response.status(200).json({
            info: conversation ? `Conversación: ${conversation.title}` : 'No existe esta conversación',
            conversation: conversation
        });
    } catch (error) {
        response.status(500).json({ error: error.message })
    }
}

const postConversation = async (request, response) => {
    try {
        const id_usuario = request.params.userId;
        const data = request.body
        const newConversation = new Conversations({
            title: data.title,
            user_id: id_usuario
        })
        // //¿Debería comprobar que no existe ya un chat con el mismo nombre?

        await newConversation.save();

        response.status(200).json({
            info: 'Conversation Created',
            id: newConversation.id,
            data: newConversation
        });
    } catch (error) {
        console.error('Error al crear la conversación:', error);
        response.status(500).json({ error: error.message })
    }
}

const deleteConversation = async (request, response) => {
    try {
        const { conversationId } = request.body;

        const conversation = await Conversations.findOne({ conversation_id: conversationId });
        
        if (!conversation) {
            return response.status(404).json({
                ok: false,
                message: 'Conversation not found'
            });
        }

        const deletedConversation = await Conversations.findOneAndDelete({ conversation_id: conversationId });

        if (deletedConversation) {
            return response.status(200).json({
                ok: true,
                message: 'Conversation deleted successfully'
            });
        } else {
            return response.status(500).json({
                ok: false,
                message: 'Failed to delete conversation'
            });
        }
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
}


module.exports = {
    getConversations,
    getConversation,
    postConversation,
    deleteConversation
}