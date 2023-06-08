const { Router } = require('express');
const { check } = require('express-validator');


const { getRequests, responseRequest, getFollowers, getFollowing, deleteFollower, deleteFollowing } = require('../controllers/friendshipController');
const { publicImage, serveImage, serveProfilePicture } = require('../controllers/imagesController');
const { validateJWT, emailIsUnique,  telephoneIsUnique, nicknameIsUnique, isNotUserHerself, targetidExists, sourceidExists, userIsNotBlocked } = require('../middlewares');
const { upload } = require('../middlewares/multer');

const router = Router();

router.get('/public/:image', publicImage );
router.get('/:id', [validateJWT], serveImage );
router.get('/user/:id', publicImage );
router.get('/profile_picture/:id', [/*validateJWT*/], serveProfilePicture );


module.exports = router;