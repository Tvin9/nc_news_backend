const topic_router = require('express').Router();

const {
	getAllTopics,
	getTopicBySlug,
} = require('../controllers/topic_controller');

//GET
topic_router.get('/', getAllTopics);
topic_router.get('/:slug', getTopicBySlug);

module.exports = topic_router;
