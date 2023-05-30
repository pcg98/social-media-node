const { Router } = require('express');
const { check } = require('express-validator');


const { usersGet, usersGetById, userProfilebyJWT, userPostCreate, uploadProfilePicture, userGetSearchByNickname } = require('../controllers/userController');
const { validateJWT, emailIsUnique, telephoneIsUnique, nicknameIsUnique } = require('../middlewares');
const { getListFiles, uploadOne, listOwnImages } = require('../controllers/imagesController');
const router = Router();
const  { upload } = require("../middlewares/multer");


router.get('/', usersGet );
router.get("/user-by-id/:id",[validateJWT] ,usersGetById);
router.get("/home",[validateJWT] ,userProfilebyJWT);
router.post("/create",[emailIsUnique, nicknameIsUnique, telephoneIsUnique] ,userPostCreate);
//router.post('/profile-picture', [validateJWT, uploadFileMiddleware], uploadProfilePicture);
router.get("/by-nickname/:nickname",[validateJWT] ,userGetSearchByNickname);

//Upload photo
router.post('/images/upload',[validateJWT, upload.single("image")], uploadOne );
//See its own photos
router.get('/images',[validateJWT], listOwnImages );
//See photos from another user
//router.get('/images',[validateJWT], listUserImages );
//get the photo
/*
router.get('/image/:id',[validateJWT], getPhoto );

//delete a photo
router.delete('/image/:id', [validateJWT], deleteImage );
*/
/*userGetSearchByNickname
router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRoleValido ), 
    validarCampos
],usuariosPut );

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( emailExiste ),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( esRoleValido ), 
    validarCampos
], usuariosPost );

router.delete('/:id',[
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAR_ROLE','OTRO_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
],usuariosDelete );

router.patch('/', usuariosPatch );


*/


module.exports = router;