const user_router = require('express').Router();
const { getUsersCont, addUserCont } = require('../controllers/user_controller');

//GET routes
user_router.get('/', getUsersCont);

//POST routes
user_router.post('/', addUserCont);

module.exports = user_router;
