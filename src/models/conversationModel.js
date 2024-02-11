const mongoose = require('../services/dbConection');

// Definir el esquema de la conversación
const conversationSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
  createdAt: { type: Date, default: Date.now }
});

// Crear el modelo de conversación
const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;
