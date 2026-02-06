const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const data = require('../db/data/test-data/index');
const request = require('supertest');
const app = require('../app');

beforeEach(async () => {
	await seed(data);
});

afterAll(async () => {
	await db.end();
});

describe('400: Errors', () => {
	test('404: Should return error when endpoint not found', () => {
		return request(app)
			.get('/api/invalid')
			.expect(404)
			.then(({ body }) => {
				expect(body.msg).toBe('Path not found!');
			});
	});
});

describe('200 GET: api/articles', () => {
	test('should reeturn a 200 status code, and the title should be a string', () => {
		return request(app)
			.get('/api/articles')
			.expect(200)
			.then(({ body }) => {
				expect(typeof body.articles[0].title).toBe('string');
			});
	});
	test('should include the desired properties of article', () => {
		return request(app)
			.get('/api/articles')
			.expect(200)
			.then(({ body }) => {
				body.articles.forEach((article) => {
					expect(article.author).toBeString();
					expect(article.title).toBeString();
					expect(article.article_id).toBeInteger();
					expect(article.topic).toBeString();
					expect(article.created_at).toBeString();
					expect(article.votes).toBeInteger();
					expect(article.article_img_url).toBeString();
				});
			});
	});
	test('should not return the body of the article', () => {
		return request(app)
			.get('/api/articles')
			.expect(200)
			.then(({ body }) => {
				body.articles.forEach((article) => {
					expect(typeof article.body).toBe('undefined');
				});
			});
	});
	test('should return articles ordered by date (descending)', () => {
		return request(app)
			.get('/api/articles')
			.then(({ body }) => {
				expect(body.articles).toBeSortedBy(body.articles.created_at, {
					descending: true,
				});
			});
	});
	test('should return the total number of comments on an article', () => {
		return request(app)
			.get('/api/articles')
			.then(({ body }) => {
				body.articles.forEach((article) => {
					expect(article.comment_count).toBeInteger();
				});
				expect(body.articles[5].comment_count).toBe('2');
			});
	});
});

describe('200 GET: api/users', () => {
	test('200: should return an object', () => {
		return request(app)
			.get('/api/users')
			.expect(200)
			.then(({ body }) => {
				expect(body.users).toBeObject();
			});
	});
	test('Object shouls have the key of users', () => {
		return request(app)
			.get('/api/users')
			.then(({ body }) => {
				expect(body.users).toContainKey('users');
			});
	});
	test('Object should have relevent properties', () => {
		return request(app)
			.get('/api/users')
			.then(({ body }) => {
				body.users.users.forEach((user) => {
					expect(user).toContainAllKeys(['username', 'name', 'avatar_url']);
				});
			});
	});
});
