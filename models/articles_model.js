const db = require('../db/connection');

exports.getAllArticles = async () => {
	const { rows } = await db.query(`
        SELECT * FROM articles
        `);
	return rows;
};
