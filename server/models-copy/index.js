const db = require('../database/config');
const initModels = require('./init-models');

module.exports = initModels(db);