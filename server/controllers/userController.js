const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/index');
const { Op } = require('sequelize');
const fs = require('fs');

const usersGet = async(req = request, res = response) => {
    //From 0 to 5
    const { offset = 0, limit = 5 } = req.query;
    const query = { user_statusid: 1 };

    const users = await User.findAll({offset, limit, where: query });
    /*
    const users = await user.findAll({offset, limit, where: query, include:{
        model: user_rol,
        as: 'user_rol'
        }
    });
    */
    res.json({
        users
    });
}
const userProfilebyJWT = async(req = request, res = response) => {
   const currentUser = req.user; 
        res.json(
            currentUser
        );
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
    const userFolder = process.env.FOLDER_IMAGES+`/${user.id}`;
    //If user with that id don't have any folder...
    if(!fs.existsSync(userFolder)){
        //Create a folder
        fs.mkdirSync(userFolder);
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
        const users = await User.findAll({
            where: {
              nickname: {
                [Op.like]: `%${nickname}%`
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
}
const uploadProfilePicture = (req, res, next) => {
    if (!req.file) {
      res.status(400).send({ message: 'No file uploaded!' });
    } else {
      // Here you can save the file path to the user profile in your database
      res.status(200).send({ message: 'File uploaded successfully!' });
      next();
    }
};

/*
const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    if ( password ) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json(usuario);
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async(req, res = response) => {

    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );

    
    res.json(usuario);
}

    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,

*/

module.exports = {
    usersGet,
    usersGetById,
    userProfilebyJWT,
    userPostCreate,
    uploadProfilePicture,
    userGetSearchByNickname
}