const express = require('express');
const router = express.Router();
const {getConversation, getConversations, postConversation} = require ( '../controllers/conversationsController' );

router.get('/all/', getConversations);
router.get('/one', getConversation);
router.post('/new', postConversation);


module.exports = router;