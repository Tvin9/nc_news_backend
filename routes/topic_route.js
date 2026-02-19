const topic_router = require('express').Router();

const { getAllTopics } = require('../controllers/topic_controller');

//GET
topic_router.get('/', getAllTopics);

module.exports = topic_router;
