
const validateJWT = require('./validate-jwt');
const validateUser = require('./validateUser');

module.exports = {
    ...validateJWT,
    ...validateUser
}