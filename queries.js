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
        SELECT topics FROM articles
        `);
	await db.end;
}

//getUsers();
//getTopic('football');
//getNegComments();

module.exports = { getAllUsers, getTopic, getNegComments };
