const { Router } = require('express');
const { check } = require('express-validator');


const { getRequests } = require('../controllers/followersController');
const { validateJWT, emailIsUnique, telephoneIsUnique, nicknameIsUnique } = require('../middlewares');
const { upload } = require('../middlewares/multer');

const router = Router();


router.get('/requests',[validateJWT], getRequests );


module.exports = router;