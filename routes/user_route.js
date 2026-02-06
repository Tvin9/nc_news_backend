const user_router = require('express').Router();
const { getUsersCont } = require('../controllers/user_controller');

user_router.get('/', getUsersCont);

module.exports = user_router;
