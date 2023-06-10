const { Router } = require('express');
const { check } = require('express-validator');


const { cancelRequest, sendRequest, blockUser, sendMessage, searchUsersByNickname, showProfileById } = require('../controllers/actionsController');
const { getNotifications, hasNotifications } = require('../controllers/notificationController');
const { validateJWT, userIsNotBlocked, isNotUserHerself, haveConversation, targetidExists, notFollowingOrPendingTarget } = require('../middlewares');

const router = Router();

//Check the JWT and if it's blocked
router.post('/send-request',[validateJWT, targetidExists, userIsNotBlocked, notFollowingOrPendingTarget], sendRequest );
router.post('/cancel-request',[validateJWT, targetidExists, userIsNotBlocked], cancelRequest );
router.post('/send-message',[validateJWT, isNotUserHerself, targetidExists, userIsNotBlocked, haveConversation], sendMessage );
router.post('/block',[validateJWT, isNotUserHerself, targetidExists ], blockUser );
router.get('/search-user/:nickname',[validateJWT], searchUsersByNickname );

router.get('/profile/:targetid',[validateJWT, targetidExists, userIsNotBlocked], showProfileById );

router.get('/notifications',[validateJWT], getNotifications );
router.get('/notifications/has',[validateJWT], hasNotifications );


module.exports = router;