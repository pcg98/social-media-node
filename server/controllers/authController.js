const { response } = require('express');
const bcryptjs = require('bcryptjs')

const User = require('../models/index').user;

const { generateJWT } = require('../helpers/generate-jwt');


const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {
      
        // Check email
        const user = await User.findOne({ email });
        if ( !user ) {
            return res.status(400).json({
                msg: 'User / Password are incorrect - email'
            });
        }

        // Check if it is enabled
        if ( !user.status != 1 ) {
            return res.status(400).json({
                msg: 'User / Password are incorrect - state: false'
            });
        }

        // Check pass
        const validPassword = bcryptjs.compareSync( password, user.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'User / Password are incorrect - password'
            });
        }

        // Generate the JWT
        const token = await generateJWT( user.id );

        res.json({
            user,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Talk with the admin'
        });
    }   

}



module.exports = {
    login
}