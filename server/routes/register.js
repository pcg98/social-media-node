const { Router } = require('express');

const { userPostCreate, emailIsUniqueContr, nicknameIsUniqueContr } = require('../controllers/registerController');
const { emailIsUnique, nicknameIsUnique, telephoneIsUnique } = require('../middlewares');

const router = Router();


router.post("/create",[emailIsUnique, nicknameIsUnique, telephoneIsUnique] ,userPostCreate);
router.get("/check-email/:email" ,emailIsUniqueContr);
router.get("/check-nickname/:nickname" ,nicknameIsUniqueContr);



module.exports = router;