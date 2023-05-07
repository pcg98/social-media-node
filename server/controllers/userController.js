const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/index').user;

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

const usersGetById = async(req = request, res = response) => {
    //From 0 to 5
    const { id } = req.params;
    const query = { user_statusid: 1, id };

    const user = await User.findAll({ where: query });
    if(!user){
    return res.status(400).json({
        msg: 'Usuario not found'
    });
    }
    res.status(200).json({
        user
    });
}
/*
const usuariosPost = async(req, res = response) => {
    
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await usuario.save();

    res.json({
        usuario
    });
}

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
    usersGetById
}