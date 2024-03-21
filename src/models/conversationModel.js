const mongoose = require('../services/dbConection');

// Definir el esquema de la conversación
const conversationSchema = new mongoose.Schema({
  title: {type: String, required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  createdAt: { type: Date, default: Date.now },
  user_id: {type: String}
});

// Crear el modelo de conversación
const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;
