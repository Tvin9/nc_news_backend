const {
	getAllUsers: getAllUsersService,
	addUser: addUserService,
} = require('../services/user_services');

//GET
exports.getUsersCont = async (req, res) => {
	const users = await getAllUsersService();

	res.status(200).send({ users });
};

//POST
exports.addUserCont = async (req, res, next) => {
	try {
		const newUser = await addUserService(req.body);
		res.status(201).send({ user: newUser });
	} catch (err) {
		next(err);
	}
};
