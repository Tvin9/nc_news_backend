const db = require('../connection');
const format = require('pg-format');
const getLookup = require('./utils');

const seed = async ({
	topicData,
	userData,
	articleData,
	commentData,
	emojisData,
}) => {
	//Deletes tables if they already exits
	await db.query(`DROP TABLE IF EXISTS comments`);
	await db.query(`DROP TABLE IF EXISTS articles`);
	await db.query(`DROP TABLE IF EXISTS users`);
	await db.query(`DROP TABLE IF EXISTS topics`);
	await db.query(`DROP TABLE IF EXISTS emojis`);

	//Creates new tables to be used later
	//Topics table
	await db.query(`
              		CREATE TABLE topics(
                		slug VARCHAR(255) PRIMARY KEY,
                		description VARCHAR(255),
                		img_url VARCHAR(1000)
              		)`);

	//Emojis table
	await db.query(`
					CREATE TABLE emojis(
						emoji_id SERIAL PRIMARY KEY,
						emoji VARCHAR(255)
					)`);

	//Users table
	await db.query(`
					CREATE TABLE users(
						username VARCHAR(255) PRIMARY KEY,
						name VARCHAR(255),
						avatar_url VARCHAR(1000)
					)`);

	//Articles table
	await db.query(`
                   CREATE TABLE articles(
						article_id SERIAL PRIMARY KEY,
						title VARCHAR(255),
						topic VARCHAR(255) REFERENCES topics(slug),
						author VARCHAR(255) REFERENCES users(username),
						body TEXT,
						created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
						votes INT DEFAULT 0,
						article_img_url VARCHAR(1000)
					)`);

	//Comments table
	await db.query(`
					CREATE TABLE comments(
						comment_id SERIAL PRIMARY KEY,
						article_id SERIAL REFERENCES articles(article_id),
						body TEXT,
						votes INT DEFAULT 0,
						author VARCHAR(255) REFERENCES users(username),
						created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
					)`);

	//Populates tables with data from data folder
	//Topics seed
	const formattedTopics = topicData.map((topic) => {
		return [topic.slug, topic.description, topic.img_url];
	});

	const topicStr = format(
		`
							INSERT INTO topics (slug, description, img_url)
							VALUES %L
							`,
		formattedTopics,
	);

	await db.query(topicStr);

	//Emojis seed
	const formattedEmojis = emojisData.map((emoji) => {
		return [emoji.emoji];
	});

	const emojiStr = format(
		`INSERT INTO emojis (emoji)
							VALUES %L`,
		formattedEmojis,
	);

	await db.query(emojiStr);

	//Users seed
	const formattedUsers = userData.map((user) => {
		return [user.username, user.name, user.avatar_url];
	});

	const userStr = format(
		`
							INSERT INTO users (username, name, avatar_url)
							VALUES %L
							`,
		formattedUsers,
	);

	await db.query(userStr);

	//Articles seed
	const formattedArticles = articleData.map((article) => {
		return [
			article.title,
			article.topic,
			article.author,
			article.body,
			article.created_at,
			article.votes,
			article.article_img_url,
		];
	});

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

	//Comments seed
	const { rows } = await db.query(artStr);
	const lookInput = rows;
	const lookup = getLookup(lookInput, 'title', 'article_id'); //generates a lookup table
	const formattedComments = commentData.map((comment) => {
		return [
			comment.body,
			comment.votes,
			comment.author,
			comment.created_at,
			lookup[comment.article_title], //uses lookup table to assign article_id
		];
	});

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
	await db.query(comStr);
};

module.exports = seed;
