
const validateJWT = require('./validate-jwt');
const validateUser = require('./validateUser');
const validateAction = require('./validateAction');
//We import all the functions in that files
module.exports = {
    ...validateJWT,
    ...validateUser,
    ...validateAction
}