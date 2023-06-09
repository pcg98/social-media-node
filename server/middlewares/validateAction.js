const { User, UserBlocked, UserFollowing, UserRequest, UserImage, UserFollower } = require('../models/index');
const { Op } = require('sequelize');
const express = require('express');
const path = require('path');

const directoryImages = process.env.FOLDER_IMAGES_USERS;

//We check if the user is blocked by other
const userIsNotBlocked = async( req = request, res = response, next ) => {
    //Get the target from post and get
    const targetid  = req.body.targetid || req.params.targetid;
    //Get the actual user
    const { id } = req.user;
    console.log(targetid);
    //Return one
    const blocked = await UserBlocked.findOne({
        where: {
          [Op.or]: [
            { targetid: targetid, sourceid: id },
            { targetid: id, sourceid: targetid }
          ]
        }
      });
    if(blocked){
      console.log(blocked);
        return res.status(403).json("Forbidden");
    }
    console.log("Not is blocked")
    next();  
}
//Avoid send more request to the target if is a friend or 
//is pending for answer
const notFollowingOrPendingTarget = async( req = request, res = response, next ) => {
  //Get the target from post or get
  const targetid  = req.body.targetid || req.params.targetid;
  //Get the actual user
  const sourceid = req.user.id;
  //Check if is following
  const isFollowing = await UserFollowing.findOne({
    where:{
      targetid,
      sourceid
    }
  });
  if(isFollowing) return res.status(403).json("Forbidden");
  //Check if is pending
  const isPending = await UserRequest.findOne({
    where:{
      targetid,
      sourceid
    }
  });
  if(isPending) return res.status(403).json("Forbidden");
  next();  
}
//Check if the user is herself
const isNotUserHerself = async( req = request, res = response, next ) => {
  //Get the target from post and get
  const targetid  = req.body.targetid || req.params.targetid;
  //Get the actual user
  const { id } = req.user;
  //Check if is the same user
  if(id==targetid){
    return res.status(403).json("Forbidden");
  }

  next();  
}
//Check that the targetId exists
const targetidExists = async( req = request, res = response, next ) => {
  //Get the target from post and get
  const targetid  = req.body.targetid || req.params.targetid;
  console.log(targetid)
  const exists = await User.findByPk( targetid );
  //Check if exists
  if(!exists){
    return res.status(404).json("User doesn't exists");
  }
  console.log("User exists")
  next();  
}
//Check that the targetId exists
const sourceidExists = async( req = request, res = response, next ) => {
  //Get the target from post and get
  const sourceid  = req.body.sourceid || req.params.sourceid;
  console.log(sourceid)
  const exists = await User.findByPk( sourceid );
  //Check if exists
  if(!exists){
    return res.status(404).json("User doesn't exists");
  }
  console.log("User exists")
  next();  
}
const listOwnImages = (req, res, next) => {
  const userId = req.user.id;
  const folderPath = directoryImages + "/" + userId;

  const staticFilesDirectory = path.join(__dirname, 'static', req.user.id.toString());
  express.static(staticFilesDirectory)(req, res, next);

}
const userHaveAccessToPhoto = async (req, res, next) => {
  const userid = req.user.id;
  const photoid = req.params.image_id || req.body.imageid;
  //Firt, get info about the user uploader
  const photo = await UserImage.findByPk(photoid,{
    include:{
      model: User,
      as: "user"
    }
  });
  req.photo = photo;
  const uploader = photo.user;
  console.log("Uploader")
  console.log(uploader);
  const uploaderid = uploader.id;
  if(userid == uploaderid){
    next(); //If there are the same person..
  }
  //Now check if the user is blocked by him or viceversa
  const isBlocked = await UserBlocked.findOne({
    where:{
      [Op.or]:[
        { targetid: userid, sourceid: uploaderid},
        { targetid: uploaderid, sourceid: userid},
      ]
    }
  });

  if(isBlocked){
    console.log("BLOCKED");
    return res.status(400);
  }
  //Check if the user is public or if they are friends
  console.log(uploader.id);
  //CHeck if user is follower of the uploader
  const userAreFollower = await UserFollower.findOne({
    where:
    { sourceid: userid, targetid: uploaderid }
  });
  //If uploader is public...
  if(uploader.user_visibilityid!=1 && !userAreFollower){
    console.log("Is neither friend or public")
    return res.status(400);
  }
  //If not, the user is private and don't have access to that.
  next();
}


module.exports = {
    userIsNotBlocked,
    isNotUserHerself,
    targetidExists,
    sourceidExists,
    notFollowingOrPendingTarget,
    listOwnImages,
    userHaveAccessToPhoto
}