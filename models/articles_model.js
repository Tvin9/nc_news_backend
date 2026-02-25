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
		SELECT 
			articles.author, 
			articles.title, 
			articles.article_id, 
			articles.topic,
			articles.body,
			articles.created_at,
			articles.votes,
			articles.article_img_url,
			COUNT(comments.comment_id)::INT AS comment_count
		FROM articles 
		LEFT JOIN comments 
			ON articles.article_id = comments.article_id
		WHERE articles.article_id = $1
		GROUP BY 
			articles.article_id
			
		`,
		[article_id],
	);

	return rows;
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

	return rows[0];
};

exports.updateVotes = async (inc_votes, article_id) => {
	const vote = Object.values(inc_votes)[0];
	const { rows } = await db.query(
		`
		UPDATE articles
		SET votes = votes + $1
		WHERE article_id = $2
		RETURNING *
		`,
		[vote, article_id],
	);

	return rows[0];
};
