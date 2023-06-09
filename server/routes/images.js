const { Router } = require('express');
const { check } = require('express-validator');


const { getRequests, responseRequest, getFollowers, getFollowing, deleteFollower, deleteFollowing } = require('../controllers/friendshipController');
const { publicImage, serveImage, serveProfilePicture, getImageAndComments, newComment } = require('../controllers/imagesController');
const { validateJWT, userHaveAccessToPhoto, } = require('../middlewares');
const { upload } = require('../middlewares/multer');

const router = Router();

router.get('/public/:image', publicImage );
router.get('/get/:image_id', [validateJWT, userHaveAccessToPhoto], serveImage );
router.get('/user/:id', publicImage );
router.get('/profile_picture/:id', [/*validateJWT*/], serveProfilePicture );
router.get('/show/:image_id', [validateJWT, userHaveAccessToPhoto], getImageAndComments );
router.post('/new-comment', [validateJWT, userHaveAccessToPhoto], newComment );//image_id


module.exports = router;