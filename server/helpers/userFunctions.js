const { User, UserBlocked, UserFollowing, UserNotification } = require('../models/index');

//We check if the user is blocked by other
const userIsNotBlocked = (sourceId, targetId) => {
    //Return true or false
    return !!UserBlocked.findOne({
        where:{
            sourceId: sourceId,
            targetId: targetId
        }
    });
}
const newNotification = async (sourceid, targetid, notification_objectid, entity_id = null) => {

    await UserNotification.create({sourceid, targetid, notification_objectid, entity_id});

}

module.exports = {
    userIsNotBlocked,
    newNotification
}