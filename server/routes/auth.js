const { Router } = require('express');
const { check } = require('express-validator');


const { login } = require('../controllers/authController');

const router = Router();


router.post('/signin', login );



module.exports = router;