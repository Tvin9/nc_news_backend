const db = require('../db/connection');

// models/articles_model.js

exports.getAllArticles = async (
	sort_by = 'created_at',
	order = 'desc',
	topic,
) => {
	const validSortBys = [
		'author',
		'title',
		'article_id',
		'topic',
		'created_at',
		'votes',
		'article_img_url',
		'comment_count',
	];

	const validOrders = ['asc', 'desc'];

	if (!validSortBys.includes(sort_by)) {
		return Promise.reject({ status: 400, msg: 'Invalid sort_by query' });
	}

	if (!validOrders.includes(order.toLowerCase())) {
		return Promise.reject({ status: 400, msg: 'Invalid order query' });
	}

	let queryStr = `
		SELECT 
			articles.author, 
			articles.title, 
			articles.article_id, 
			articles.topic,
			articles.created_at,
			articles.votes,
			articles.article_img_url,
			COUNT(comments.comment_id)::INT AS comment_count
		FROM articles 
		LEFT JOIN comments 
		ON articles.article_id = comments.article_id
	`;

	const queryValues = [];

	if (topic) {
		queryValues.push(topic);
		queryStr += ` WHERE articles.topic = $1`;
	}

	queryStr += `
		GROUP BY articles.article_id
		ORDER BY ${sort_by} ${order.toUpperCase()}
	`;

	const { rows } = await db.query(queryStr, queryValues);

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

	if (rows.length === 0) {
		return Promise.reject({ status: 404, msg: 'Article not found' });
	}

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
