const { getAllUsers, addUser } = require('../models/users_model');

exports.getAllUsers = () => {
	return getAllUsers();
};

exports.addUser = (newUser) => {
	return addUser(newUser);
};
