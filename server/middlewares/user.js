const { User, UserBlocked, UserFollowing } = require('../models/index');
//We check if the user is blocked by other
const userIsBlocked = async( req = request, res = response, next ) => {
    const { id, targetId } = req.body;
    //Return true or false
    const blocked = !!UserBlocked.findOne({
        where:{
            sourceId: id,
            targetId: targetId
        }
    });
    if(blocked){
        return res.status(403).json("Forbidden");
    }
    next();
    
}

module.exports = {
    userIsBlocked
}