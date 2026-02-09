const db = require('../db/connection');

exports.getAllArticles = async () => {
	const { rows } = await db.query(`
        SELECT 
			articles.author, 
			articles.title, 
			articles.article_id, 
			articles.topic,
			articles.created_at,
			articles.votes,
			articles.article_img_url,
			COUNT (*) AS comment_count
		FROM articles 
		LEFT JOIN comments 
		ON articles.article_id = comments.article_id
		GROUP BY articles.article_id
		ORDER BY articles.created_at DESC
		`);
	return rows;
};

exports.getArticlesById = async (article_id) => {
	const { rows } = await db.query(
		`
		SELECT * FROM articles
		WHERE article_id = $1
	`,
		[article_id],
	);
	const article_by_id = { article: rows };

	return article_by_id;
};

exports.getArticleComments = async (article_id) => {
	const { rows } = await db.query(
		`
		SELECT * FROM comments
		WHERE article_id = $1
		ORDER BY comments.created_at DESC
		`,
		[article_id],
	);
	const comments = rows;

	return comments;
};

exports.postComment = async (comment, article_id) => {
	const author = comment.author;
	const body = comment.body;

	const { rows } = await db.query(
		`
		INSERT INTO comments (author, body, article_id)
		VALUES ($1, $2, $3) 
		RETURNING *
		`,
		[author, body, article_id],
	);
	//console.log(newComment);
	return rows[0];
};
