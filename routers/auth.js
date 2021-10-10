const { Router } = require('express');
const { check } = require('express-validator');

const { login, revalidarToken } = require('../controllers/auth');

const { usuariosPost } = require('../controllers/usuarios');

const { emailExiste, esRoleValido } = require('../helpers');
const { validarJWT } = require('../middlewares');
const { validarCampos } = require('../middlewares/validar_campos');

const router = Router();

router.post('/login',[
    check('correo', 'El correo no es válido').isEmail(), //middleware (se ejecutan antes de otra cosa) crea un registro 
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos //al final para validar los campos

] ,login );

// router.post('/google',[
//     check('id_token', 'El id_token es necesario').not().isEmpty(), //middleware (se ejecutan antes de otra cosa) crea un registro 
//     validarCampos
// ] ,googleSingin );

router.post('/register',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min:6 }),
    check('correo', 'El correo no es válido').isEmail(), //middleware (se ejecutan antes de otra cosa) crea un registro 
    
    check('correo').custom( emailExiste ), //middleware (se ejecutan antes de otra cosa) crea un registro 
    
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    //check('rol').custom( esRoleValido ), // es lo mismo (rol) => esRoleValido(rol) //es una valdiacion hecha por mi
    validarCampos //al final para validar los campos

], usuariosPost);


router.get('/renew',validarJWT, revalidarToken );

module.exports = router;