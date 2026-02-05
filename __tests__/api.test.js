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

describe('GET: api/articles', () => {
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
					expect(typeof article.body).toBe(null);
				});
			});
	});
	//test("", () => {});
});
