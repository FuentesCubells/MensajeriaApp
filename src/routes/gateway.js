const express = require('express');
const router = express.Router();
const { getData, postRegister, putUser, deleteUser, getMsg, sendMsg, postConversation, dltConversation } = require('../controllers/gatewayController');

router.get('/auth', getData);
router.post('/register', postRegister);
router.put('/editUser', putUser);
router.post('/deleteUser', deleteUser);

router.get('/msg', getMsg);
router.post('/msg/send', sendMsg);

router.post('/cnvs', postConversation);
router.post('/cnvs/dlt', dltConversation);

module.exports = router;