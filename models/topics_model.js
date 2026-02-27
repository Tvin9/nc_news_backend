const db = require('../db/connection');

exports.getAllTopics = async () => {
	const { rows } = await db.query(`
        SELECT slug, description, img_url FROM topics
        `);
	return rows;
};

exports.getTopicBySlug = async (slug) => {
	const { rows } = await db.query(
		`SELECT slug, description, img_url FROM topics WHERE slug = $1`,
		[slug],
	);
	return rows[0];
};
