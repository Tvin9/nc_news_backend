const { getAllUsers } = require('../models/users_model');

exports.getAllUsers = () => {
	return getAllUsers();
};
