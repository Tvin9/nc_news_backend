const db = require('../db/connection');

exports.deleteComment = async (comment_id) => {
	const { rows } = await db.query(
		`
		DELETE FROM comments
		WHERE comment_id = $1
		RETURNING *
		`,
		[comment_id],
	);
	return rows[0];
};
