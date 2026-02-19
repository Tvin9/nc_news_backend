const { getAllTopics } = require('../models/topics_model');

exports.getAllTopics = () => {
	return getAllTopics();
};
