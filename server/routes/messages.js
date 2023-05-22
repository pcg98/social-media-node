const { Router } = require('express');
const { check } = require('express-validator');


const { getConversations, getMessages } = require('../controllers/messagesController');
const { validateJWT, userIsNotBlocked, isNotUserHerself, isUserConversation, haveConversation, targetidExists } = require('../middlewares');
const { upload } = require('../middlewares/multer');

const router = Router();

//Check the JWT and if it's blocked
router.get('/',[validateJWT], getConversations );
router.get('/:conversationid',[validateJWT, isUserConversation], getMessages );



module.exports = router;