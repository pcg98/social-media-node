const { Router } = require('express');
const { check } = require('express-validator');


const { getRequests, responseRequest, getFollowers } = require('../controllers/followersController');
const { validateJWT, emailIsUnique,  telephoneIsUnique, nicknameIsUnique, isNotUserHerself, targetidExists, sourceidExists, userIsNotBlocked } = require('../middlewares');
const { upload } = require('../middlewares/multer');

const router = Router();


router.get('/requests',[validateJWT], getRequests );
router.post('/requests/answer',[validateJWT, isNotUserHerself], responseRequest );
router.get('/',[validateJWT], getFollowers);


module.exports = router;