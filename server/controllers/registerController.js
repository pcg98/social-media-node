const { response, request } = require('express');
const { User} = require('../models/index');
const bcryptjs = require('bcryptjs');
const fs = require('fs');


const emailIsUniqueContr = async( req = request, res = response ) => {
    console.log(req.params);
    const email = req.params.email ||req.body.email;
    try {
        console.log("Entramos al controller del email");
        const user = await User.findOne({ where: { email } });
        if (user) {
          return res.status(409).json({ emailTaken: true });
        }
        return res.status(200).json(null);
      } catch (err) {
        return res.status(500).json({ message: 'Error occurred while checking email uniqueness. Controller' });
      }
}

const nicknameIsUniqueContr = async( req = request, res = response ) => { 
    const nickname = req.params.nickname ||req.body.nickname;
    try {
        const user = await User.findOne({ where: { nickname } });
        if (user) {
          return res.status(409).json({ nicknameTaken: true });
        }
        return res.status(200).json(null);
    } catch (err) {
        return res.status(500).json({ message: 'Error occurred while checking nickname uniqueness.' });
    }
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


module.exports = {
    nicknameIsUniqueContr,
    emailIsUniqueContr,
    userPostCreate
}