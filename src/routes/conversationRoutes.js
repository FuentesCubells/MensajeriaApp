const express = require('express');
const router = express.Router();
const {getConversation, getConversations, postConversation, deleteConversation} = require ( '../controllers/conversationsController' );

router.get('/all/:userId', getConversations);
router.get('/one/:userId', getConversation);
router.post('/new/:userId', postConversation);
router.post('/delete/:userId', deleteConversation)


module.exports = router;