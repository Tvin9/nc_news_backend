const db = require('../db/connection');

exports.getAllArticles = async () => {
	const { rows } = await db.query(`
        SELECT 
			author, 
			title, 
			article_id, 
			topic,
			created_at,
			votes,
			article_img_url
		FROM articles
		`);
	return rows;
};
