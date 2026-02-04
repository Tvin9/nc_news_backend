const db = require('../db/connection');

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

module.exports = { getAllTopics, getArticleByUser };
