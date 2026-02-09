const comment_router = require('express').Router();
const { deleteComment } = require('../controllers/comment_controller');

//DELETE routes
comment_router.delete('/:comment_id', deleteComment);

module.exports = comment_router;
