const { Router } = require('express');

const { usersGet, usersGetById, userProfilebyJWT, userPostCreate , userGetSearchByNickname, updateUser, userCloseProfile } = require('../controllers/userController');
const { validateJWT, emailIsUnique, telephoneIsUnique, nicknameIsUnique } = require('../middlewares');
const { uploadOne, listImage, serveImage, uploadProfilePicture } = require('../controllers/imagesController');
const router = Router();
const  { upload, uploadProfilePictureMult } = require("../middlewares/multer");


router.get('/', usersGet );
router.get("/user-by-id/:id",[validateJWT] ,usersGetById);
router.get("/home",[validateJWT] ,userProfilebyJWT);
router.post("/create",[emailIsUnique, nicknameIsUnique, telephoneIsUnique] ,userPostCreate);
//router.post('/profile-picture', [validateJWT, uploadFileMiddleware], uploadProfilePicture);
router.get("/by-nickname/:nickname",[validateJWT] ,userGetSearchByNickname);

//Upload photo
router.post('/images/upload',[validateJWT, upload.single("image")], uploadOne );
//Upload profile picture
router.post('/profile/picture',[validateJWT, uploadProfilePictureMult.single("image")], uploadProfilePicture );
//See its own photos
router.get('/images',[validateJWT], serveImage);
//Modify his profile
router.patch('/update',[validateJWT], updateUser);
//Close his profile
router.get('/close-profile',[validateJWT], userCloseProfile);

router.get('/friend/images/:id_image',[validateJWT], listImage );



module.exports = router;