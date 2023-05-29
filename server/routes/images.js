const { Router } = require('express');
const { check } = require('express-validator');


const { getRequests, responseRequest, getFollowers, getFollowing, deleteFollower, deleteFollowing } = require('../controllers/friendshipController');
const { validateJWT, emailIsUnique,  telephoneIsUnique, nicknameIsUnique, isNotUserHerself, targetidExists, sourceidExists, userIsNotBlocked } = require('../middlewares');
const { upload } = require('../middlewares/multer');

const router = Router();

// FOLLLOWERS PART

router.get('/upload',[validateJWT], uploadPhoto );
//get the photo
router.get('/:id',[validateJWT, isNotUserHerself], getPhoto );


module.exports = router;