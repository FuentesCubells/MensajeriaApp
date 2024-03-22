const express = require('express');
const router = express.Router();
const {getMessages, postMessage} = require ( '../controllers/messagesController' );

router.get('/', getMessages)
router.post('/send/:userId', postMessage);

module.exports = router;