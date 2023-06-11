const { Router } = require('express');


const { getConversations, getMessages } = require('../controllers/messagesController');
const { validateJWT, isUserConversation } = require('../middlewares');

const router = Router();

//Check the JWT and if it's blocked
router.get('/',[validateJWT], getConversations );
router.get('/:conversationid',[validateJWT, isUserConversation], getMessages );



module.exports = router;