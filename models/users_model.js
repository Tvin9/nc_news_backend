const db = require('../db/connection');

exports.getAllUsers = async () => {
	const { rows } = await db.query(`
        SELECT * FROM users
        `);

	return rows;
};

exports.addUser = async (newUser) => {
	const { username, name, avatar_url } = newUser;
	const { rows } = await db.query(
		`
              INSERT INTO users (username, name, avatar_url)
              VALUES ($1, $2, $3)  
              RETURNING *  
                `,
		[username, name, avatar_url],
	);

	return rows[0];
};
