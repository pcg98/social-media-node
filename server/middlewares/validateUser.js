const { response, request } = require('express');
const User = require('../models/index').user;

const emailIsUnique = async( req = request, res = response, next ) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (user) {
          return res.status(409).json({ message: 'Email already exists.' });
        }
        next();
      } catch (err) {
        return res.status(500).json({ message: 'Error occurred while checking email uniqueness.' });
      }
      

}
const usernameIsUnique = async( req = request, res = response, next ) => {
        
    const { username } = req.body;

    try {
        const user = await User.findOne({ where: { username } });
        if (user) {
          return res.status(409).json({ message: 'username already exists.' });
        }
        next();
    } catch (err) {
        return res.status(500).json({ message: 'Error occurred while checking username uniqueness.' });
    }

}

module.exports = {
    emailIsUnique,
    usernameIsUnique
};