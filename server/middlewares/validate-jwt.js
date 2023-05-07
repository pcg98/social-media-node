const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/index').user;

const validateJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'There isn\'t a token in the request'
        });
    }

    try {
        
        const { id } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        // leer el usuario que corresponde al uid
        const user = await User.findById( id );

        if( !user ) {
            return res.status(401).json({
                msg: 'Token invalid - user not DB'
            })
        }

        // Verificar si el uid tiene estado true
        if ( !user.estado ) {
            return res.status(401).json({
                msg: 'Token unuseful - user with state: false'
            })
        }
        
        
        req.user = user;
        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token invalid'
        })
    }

}




module.exports = {
    validateJWT
}