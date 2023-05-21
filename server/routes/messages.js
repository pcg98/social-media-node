const { Router } = require('express');
const { check } = require('express-validator');


const { getConversations } = require('../controllers/messagesController');
const { validateJWT, userIsNotBlocked, isNotUserHerself, haveConversation, targetidExists } = require('../middlewares');
const { upload } = require('../middlewares/multer');

const router = Router();

//Check the JWT and if it's blocked
router.get('/',[validateJWT], getConversations );



module.exports = router;