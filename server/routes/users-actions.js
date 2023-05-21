const { Router } = require('express');
const { check } = require('express-validator');


const { cancelRequest, sendRequest, blockUser, sendMessage, searchUsersByNickname, showProfileById } = require('../controllers/actionsController');
const { validateJWT, userIsNotBlocked, isNotUserHerself, haveConversation, targetidExists } = require('../middlewares');
const { upload } = require('../middlewares/multer');

const router = Router();

//Check the JWT and if it's blocked
router.post('/send-request',[validateJWT, targetidExists, userIsNotBlocked], sendRequest );
router.post('/cancel-request',[validateJWT, targetidExists, userIsNotBlocked], cancelRequest );
router.post('/send-message',[validateJWT, isNotUserHerself, targetidExists, userIsNotBlocked, haveConversation], sendMessage );
router.post('/block',[validateJWT, isNotUserHerself, targetidExists ], blockUser );
router.get('/search-user/:nickname',[validateJWT], searchUsersByNickname );
router.get('/profile/:targetid',[validateJWT, targetidExists, userIsNotBlocked], showProfileById );

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