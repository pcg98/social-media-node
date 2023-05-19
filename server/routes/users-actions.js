const { Router } = require('express');
const { check } = require('express-validator');


const { sendRequest, blockUser, searchUsersByNickname } = require('../controllers/actionsController');
const { validateJWT } = require('../middlewares');
const { upload } = require('../middlewares/multer');

const router = Router();


router.post('/send-request',[validateJWT], sendRequest );
router.post('/block',[validateJWT], blockUser );
router.post('/search-user',[validateJWT], searchUsersByNickname );
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