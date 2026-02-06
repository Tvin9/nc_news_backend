const db = require('../db/connection');

exports.getAllUsers = async () => {
	const { rows } = await db.query(`
        SELECT * FROM users
        `);
	const users = { users: rows };
	console.log(users);
	return users;
};
