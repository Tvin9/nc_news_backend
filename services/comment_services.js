const { deleteComment } = require('../models/comments_model');

exports.deleteComment = (comment_id) => {
	return deleteComment(comment_id);
};
