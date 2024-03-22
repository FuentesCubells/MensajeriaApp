const mongoose = require('../services/dbConection');

const messageSchema = new mongoose.Schema({
  conversation_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  user_id: {type: String}
});

// Crear el modelo de mensaje
const Message = mongoose.model('Message', messageSchema);

module.exports = Message; // Exportar el modelo para usarlo en otros archivos

