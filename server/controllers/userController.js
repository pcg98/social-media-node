const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { User, UserFollower, UserFollowing, UserImage } = require('../models/index');
const { Op } = require('sequelize');
const fs = require('fs');
const { getImagesFromUser } = require('../helpers/userFunctions');


const usersGet = async(req = request, res = response) => {
    //From 0 to 5
    const { offset = 0, limit = 5 } = req.query;
    const query = { user_statusid: 1 };

    const users = await User.findAll({offset, limit, where: query });
    res.json({
        users
    });
}
const userProfilebyJWT = async(req = request, res = response) => {
    const currentUser = req.user; 
    const currentId = currentUser.id;
    console.log("Hola");
    const numberFollowers = await UserFollower.count({ where: { targetid: currentId } });
    console.log(numberFollowers);
    const numberFollowing = await UserFollowing.count({ where: { sourceid: currentId } });
    const userPictures = await UserImage.findAll({ where:
        {userid: currentId,
        url: {
            [Op.notLike]: '%profile_picture/%'
            }} });       
    const pictures = getImagesFromUser(currentId);
    res.json({currentUser,
                numberFollowers,
                numberFollowing,
                userPictures});
}

const usersGetById = async(req = request, res = response) => {
    //From 0 to 5
    const { id } = req.params;
    const query = { user_statusid: 1, id };

    const user = await User.findAll({ where: query });
    if(!user){
    return res.status(400).json({
        msg: 'User not found'
    });
    }
    res.status(200).json({
        user
    });
}

const userPostCreate = async(req, res = response) => {
    try{
        const { password } = req.body;
        const user = new User(req.body);

    // Encrypt the password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );
    console.log('Creating new user');
    // Save on DB
    await user.save();
    console.log(user);
    //Create the route for the user folder
    const userFolder = process.env.FOLDER_IMAGES_USERS+`/${user.id}`;
    //If user with that id don't have any folder...
    if(!fs.existsSync(userFolder)){
        //Create a folder
        fs.mkdirSync(userFolder);
        //Create another
        fs.mkdirSync(`${userFolder}/profile_picture`)
    }
    //Return the user as a JSON
    res.status(200).json({
        user
    });
    }catch(e){
        console.log(e);
        res.status(422).json('Something was wrong');
    }
}
const userGetSearchByNickname = async(req, res = response) => {
    try{
        const { nickname } = req.params;
        const userid = req.user.id;
        console.log(userid)
        const users = await User.findAll({
            where: {
              nickname: {
                [Op.like]: `%${nickname}%`
              },
              id:{
                [Op.ne]: userid
              }
            }
        });

        console.log(users);
        //Return the users as a JSON
        res.status(200).json(users);
    }catch(e){
        console.log(e);
        res.status(422).json('Something was wrong');
    }
};
const uploadProfilePicture = (req, res, next) => {
    if (!req.file) {
      res.status(400).send({ message: 'No file uploaded!' });
    } else {
      // Here you can save the file path to the user profile in your database
      res.status(200).send({ message: 'File uploaded successfully!' });
      next();
    }
};

const updateUser = async (req, res) => {
    try{
        const id_user = req.user.id;
        //Things that can't change
        const { id, email, nickname, password, user_rolid, ...rest } = req.body;
        console.log(rest)

        if ( password ) {
            // Encriptar la contraseña
            const salt = bcryptjs.genSaltSync();
            rest.password = bcryptjs.hashSync( password, salt );
        }
        const user = await User.findByPk(id_user);
        await user.update(rest);
        console.log(user);
        res.status(200).json(user);
    }catch(e){
        res.status(500).json("Something was wrong");
    }
};
//Method for change his status of one to two (closed)
const userCloseProfile = async (req, res) => {
    try{
        const id_user = req.user.id;
        console.log("We enter to close the profile");

        const user = await User.findByPk(id_user,{
            where: { user_statusid: 1 }
        });

        let result = await user.update({user_statusid: 2});
        if(result){
            return res.status(200).json("Account close");
        }
        res.status(404).json("Active user not found");
    }catch(e){
        console.log("Something was wrong closing an account");
        res.status(500).json("Something was wrong");
    }
};
const userReactivateProfile = async (req, res) => {
    try{
        const id_user = req.user.id;
        console.log("We enter to reactivate the profile");

        const user = await User.findByPk(id_user,{
            where: { user_statusid: 2 }
        });

        let result = await user.update({user_statusid: 1});
        if(result){
            return res.status(200).json("Account reactivated");
        }
        res.status(404).json("Disabled user not found");
    }catch(e){
        console.log("Something was wrong reactivating an account");
        res.status(500).json("Something was wrong");
    }
};

module.exports = {
    usersGet,
    usersGetById,
    userProfilebyJWT,
    userPostCreate,
    uploadProfilePicture,
    userGetSearchByNickname,
    updateUser,
    userCloseProfile
}