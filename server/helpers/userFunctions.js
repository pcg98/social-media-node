const { User, UserBlocked, UserFollowing, UserNotification, UserImage } = require('../models/index');

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
const getImagesFromUser = async (id) => {
    
    const images = await UserImage.findAll({
      where:{
        userid: id
      }
    });
  
    if(!images){
      return
    }
  
    //We fullfill this with info of every image
    const responseData = images.map(image => {
      return {
        imageUrl: `/images/${image.id}`,
        title: image.title,
        createdAt: image.createdAt
      };
    });
    return responseData;
};
const newNotification = async (sourceid, targetid, notification_objectid, entity_id = null) => {

    await UserNotification.create({sourceid, targetid, notification_objectid, entity_id});

}

module.exports = {
    userIsNotBlocked,
    newNotification,
    getImagesFromUser
}