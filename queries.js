const db = require('./db/connection');

async function getAllUsers() {
	const allUsers = await db.query(`SELECT * FROM users`);
	await db.end();
	console.log(allUsers);
	return allUsers;
}

async function getTopic(topic) {
	const topics = await db.query(`
        SELECT * FROM articles
        WHERE topic = '${topic}'
        `);
	await db.end;
	console.log(topics);
	return topics;
}

async function getNegComments() {
	const negComments = await db.query(`
        SELECT * FROM comments
        WHERE votes < 0
        `);
	await db.end;
	console.log(negComments);
	return negComments;
}

async function getAllTopics() {
	const allTopics = await db.query(`
        SELECT topic FROM articles
        `);
	await db.end;
	console.log(allTopics);
	return allTopics;
}

async function getArticleByUser(user) {
	const userArts = await db.query(`
        SELECT * FROM articles
        WHERE author = '${user}'
        `);
	await db.end;
	console.log(userArts);
	return userArts;
}

async function getVotesAboveTen() {
	const voteTen = await db.query(`
        SELECT * FROM COMMENTS
        WHERE votes > 10
        `);
	await db.end;
	console.log(voteTen);
	return voteTen;
}

//getUsers();
//getTopic('football');
//getNegComments();
//getAllTopics();
//getArticleByUser('cooljmessy');
//getVotesAboveTen();

module.exports = {
	getAllUsers,
	getTopic,
	getNegComments,
	getAllTopics,
	getArticleByUser,
	getVotesAboveTen,
};
