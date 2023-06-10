const { Op } = require('sequelize');
const { User, UserBlocked, UserFollowing, UserNotification, UserImage, UserFollower, UserRequest } = require('../models/index');

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
//With this method we know if the actual user is
//unknow, blocked, friend or pending from another
const knowrelationship = async(userid, targetid) => {
  if(userid == targetid){
    return "herself"; //If there are the same person..
  }
  //Now check if the user is blocked by him or viceversa
  const isBlocked = await UserBlocked.findOne({
    where:{
      [Op.or]:[
        { targetid: userid, sourceid: targetid},
        { targetid: targetid, sourceid: userid},
      ]
    }
  });

  if(isBlocked){
    return "blocked";
  }
  //CHeck if user is follower of the uploader
  const userAreFollowingTarget = await UserFollower.findOne({
    where:
    { sourceid: userid, targetid: targetid }
  });
  //If target is following by the user...
  if(userAreFollowingTarget){
    return "following";
  }
  const arePending = await UserRequest.findOne({
    where:{
      sourceid: userid, targetid: targetid
    }
  });

  if(arePending){
    return "pending";
  }
  //If nothing they are unknows
  return "unknows";
}

module.exports = {
    userIsNotBlocked,
    newNotification,
    getImagesFromUser,
    knowrelationship
}