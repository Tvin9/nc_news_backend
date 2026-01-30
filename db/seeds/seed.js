const db = require('../connection');
const format = require('pg-format');
const getLookup = require('./utils');

const seed = ({ topicData, userData, articleData, commentData }) => {
	return db.query(`DROP TABLE IF EXISTS comments`).then(() => {
		return db.query(`DROP TABLE IF EXISTS articles`).then(() => {
			return db.query(`DROP TABLE IF EXISTS users`).then(() => {
				return db.query(`DROP TABLE IF EXISTS topics`).then(() => {
					return db
						.query(
							`
              				CREATE TABLE topics(
                				slug VARCHAR(255) PRIMARY KEY,
                				description VARCHAR(255),
                				img_url VARCHAR(1000)
              				)`,
						)
						.then(() => {
							return db
								.query(
									`
								CREATE TABLE users(
									username VARCHAR(255) PRIMARY KEY,
									name VARCHAR(255),
									avatar_url VARCHAR(1000)
								)`,
								)
								.then(() => {
									return db
										.query(
											`
                      
									CREATE TABLE articles(
										article_id SERIAL PRIMARY KEY,
										title VARCHAR(255),
										topic VARCHAR(255) REFERENCES topics(slug),
										author VARCHAR(255) REFERENCES users(username),
										body TEXT,
										created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
										votes INT DEFAULT 0,
										article_img_url VARCHAR(1000)
									)`,
										)
										.then(() => {
											return db
												.query(
													`
														CREATE TABLE comments(
															comment_id SERIAL PRIMARY KEY,
															article_id SERIAL REFERENCES articles(article_id),
															body TEXT,
															votes INT DEFAULT 0,
															author VARCHAR(255) REFERENCES users(username),
															created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
														)
														`,
												)
												.then(() => {
													const formattedTopics = topicData.map((topic) => {
														return [
															topic.slug,
															topic.description,
															topic.img_url,
														];
													});

													const topicStr = format(
														`
															INSERT INTO topics (slug, description, img_url)
															VALUES %L
															`,
														formattedTopics,
													);

													return db.query(topicStr).then(() => {
														const formattedUsers = userData.map((user) => {
															return [
																user.username,
																user.name,
																user.avatar_url,
															];
														});

														const userStr = format(
															`
															INSERT INTO users (username, name, avatar_url)
															VALUES %L
															`,
															formattedUsers,
														);

														return db.query(userStr).then(() => {
															const formattedArticles = articleData.map(
																(article) => {
																	return [
																		article.title,
																		article.topic,
																		article.author,
																		article.body,
																		article.created_at,
																		article.votes,
																		article.article_img_url,
																	];
																},
															);

															const artStr = format(
																`
																INSERT INTO articles 
																	(title,
																	topic,
																	author, 
																	body,
																	created_at,
																	votes,
																	article_img_url)
																VALUES %L 
																RETURNING *
																`,
																formattedArticles,
															);
															return db.query(artStr).then(({ rows }) => {
																const lookInput = rows;
																const lookup = getLookup(
																	lookInput,
																	'title',
																	'article_id',
																);
																const formattedComments = commentData.map(
																	(comment) => {
																		return [
																			comment.body,
																			comment.votes,
																			comment.author,
																			comment.created_at,
																			lookup[comment.article_title],
																		];
																	},
																);

																const comStr = format(
																	`
																	INSERT INTO comments
																		(body,
																		votes,
																		author,
																		created_at,
																		article_id)
																	VALUES %L
																	`,
																	formattedComments,
																);
																return db.query(comStr);
															});
														});
													});
												});
										});
								});
						});
				});
			});
		});
	});
};

module.exports = seed;
