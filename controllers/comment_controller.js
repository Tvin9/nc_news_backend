const {
	deleteComment: deleteCommentService,
} = require('../services/comment_services');

//DELETE
exports.deleteComment = (req, res) => {
	const { comment_id } = req.params;
	deleteCommentService(comment_id).then((comment) => {
		res.status(204).send({ comment });
	});
};
