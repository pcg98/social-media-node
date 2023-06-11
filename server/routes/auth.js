const { Router } = require('express');


const { login } = require('../controllers/authController');

const router = Router();


router.post('/signin', login );



module.exports = router;