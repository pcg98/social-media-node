const { response, request } = require('express');
const { User } = require('../models/index');

const emailIsUnique = async( req = request, res = response, next ) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (user) {
          return res.status(409).json({ emailTaken: true });
        }
        next();
      } catch (err) {
        return res.status(500).json({ message: 'Error occurred while checking email uniqueness.' });
      }
      

}
const nicknameIsUnique = async( req = request, res = response, next ) => {
        
    const { nickname } = req.body;

    try {
        const user = await User.findOne({ where: { nickname } });
        if (user) {
          return res.status(409).json({ nicknameTaken: true });
        }
        next();
    } catch (err) {
        return res.status(500).json({ message: 'Error occurred while checking nickname uniqueness.' });
    }

}
const telephoneIsUnique = async( req = request, res = response, next ) => {
        
  const { telephone } = req.body;

  try {
      const user = await User.findOne({ where: { telephone } });
      if (user) {
        return res.status(409).json({ telephoneTaken: true });
      }
      next();
  } catch (err) {
      return res.status(500).json({ message: 'Error occurred while checking telephone uniqueness.' });
  }

}

module.exports = {
    emailIsUnique,
    nicknameIsUnique,
    telephoneIsUnique
};