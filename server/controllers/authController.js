const { response } = require('express');
const bcryptjs = require('bcryptjs')

const { User } = require('../models/index');

const { generateJWT } = require('../helpers/generate-jwt');


const login = async(req, res = response) => {

    const { email, password } = req.body;
    console.log("New request");

    try {
      
        // Check email
        const user = await User.findOne({ 
            where: {
                email: email
            }
        });
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
        console.log(user);
        // Generate the JWT
        const token = await generateJWT( user.id, user.rol );
        console.log(token);
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