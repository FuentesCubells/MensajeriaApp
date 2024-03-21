const express = require('express');
const router = express.Router();
const {getConversation, getConversations, postConversation} = require ( '../controllers/conversationsController' );

router.get('/all/:userId', getConversations);
router.get('/one/:userId', getConversation);
router.post('/new', postConversation);


module.exports = router;