const {
	getAllUsers: getAllUsersService,
} = require('../services/user_services');

exports.getUsersCont = async (req, res) => {
	const users = await getAllUsersService();

	res.status(200).send({ users });
};
