const { Router } = require('express');


const { getRequests, responseRequest, getFollowers, getFollowing, deleteFollower, deleteFollowing } = require('../controllers/friendshipController');
const { validateJWT, isNotUserHerself } = require('../middlewares');

const router = Router();

// FOLLLOWERS PART

router.get('/followers/requests',[validateJWT], getRequests );
router.post('/followers/requests/answer',[validateJWT, isNotUserHerself], responseRequest );
router.delete('/followers',[validateJWT], getFollowers);
router.get('/followers',[validateJWT], getFollowers);
router.delete('/followers/delete/:sourceid',[validateJWT], deleteFollower);

// FOLLOWING PART
//router.get('/following/request',[validateJWT], sendRequests );
router.get('/following',[validateJWT], getFollowing);
router.delete('/following/delete/:targetid',[validateJWT], deleteFollowing);


module.exports = router;