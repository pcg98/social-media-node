const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const User = require('../models/user');



const usuariosGet = async(req = request, res = response) => {
    //From 0 to 5
    const { offset = 1, limit = 1 } = req.query;
    const query = { user_statusid: 1 };

    const users = await User.findAll({offset, limit, where: query });

    res.json({
        users
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
    usuariosGet
}