const { User, UserBlocked, UserFollowing } = require('../models/index');
//We check if the user is blocked by other
const userIsBlocked = (sourceId, targetId) => {
    //Return true or false
    return !!UserBlocked.findOne({
        where:{
            sourceId: sourceId,
            targetId: targetId
        }
    });
}

module.exports = {
    userIsBlocked
}