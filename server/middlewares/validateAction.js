const { User, UserBlocked, UserFollowing } = require('../models/index');
const { Op } = require('sequelize');

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

module.exports = {
    userIsNotBlocked,
    isNotUserHerself,
    targetidExists
}