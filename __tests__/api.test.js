const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const data = require('../db/data/test-data/index');
const request = require('supertest');
const app = require('../app');
const supertest = require('supertest');

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

describe('200 GET: api/topics', () => {
	test('Should get a 200 status message', () => {
		return request(app).get('/api/topics').expect(200);
	});
	test('should return an object', () => {
		return request(app)
			.get('/api/topics')
			.then(({ body }) => {
				expect(body).toBeObject();
			});
	});
	test('returned object should ahve property of topics', () => {
		return request(app)
			.get('/api/topics')
			.then(({ body }) => {
				expect(body).toHaveProperty('topics');
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

describe('200 GET: api/articles/:article_id', () => {
	test('Should get a 200 status message', () => {
		return request(app).get('/api/articles/1').expect(200);
	});

	test('Should return an object', () => {
		return request(app)
			.get('/api/articles/2')
			.expect(200)
			.then(({ body }) => {
				expect(body).toBeObject();
			});
	});
});

describe('200 GET: api/articles/:article_id/comments', () => {
	test('Should return a 200 status method', () => {
		return request(app).get('/api/articles/1/comments').expect(200);
	});
	test('Should return an object', () => {
		return request(app)
			.get('/api/articles/2/comments')
			.expect(200)
			.then(({ body }) => {
				expect(body).toBeObject();
			});
	});
	test('Should return comments sorted by date, most recent first', () => {
		return request(app)
			.get('/api/articles/1/comments')
			.then(({ body }) => {
				expect(body.comments).toBeSortedBy(body.comments.created_at);
			});
	});
	//test("", () => {});
});

describe('200 GET: api/users', () => {
	test('200: should return an object', () => {
		return request(app)
			.get('/api/users')
			.expect(200)
			.then(({ body }) => {
				expect(body).toBeObject();
			});
	});
	test('Object shouls have the key of users', () => {
		return request(app)
			.get('/api/users')
			.then(({ body }) => {
				expect(body).toContainKey('users');
			});
	});
	test('Object should have relevant properties', () => {
		return request(app)
			.get('/api/users')
			.then(({ body }) => {
				body.users.forEach((user) => {
					expect(user).toContainAllKeys(['username', 'name', 'avatar_url']);
				});
			});
	});
});

describe('201 POST: /api/articles/:article_id/comments', () => {
	test('Should return with a 201 status', () => {
		return request(app)
			.post('/api/articles/2/comments')
			.send({ author: 'butter_bridge', body: 'Rubbish!' })
			.expect(201);
	});
	test('Should accept a username and text into the database', () => {
		return request(app)
			.post('/api/articles/2/comments')
			.send({ author: 'butter_bridge', body: 'Rubbish!' })
			.then(({ body }) => {
				expect(body.comment).toHaveProperty('author');
			});
	});
});

describe('201 POST: /api/users', () => {
	test('Should return a 201 status code and the new user', () => {
		return request(app)
			.post('/api/users')
			.send({
				username: 'Bob',
				name: 'Bob Bobberton',
				avatar_url: '/avatars/elephant_avatar.svg',
			})
			.expect(201)
			.then(({ body }) => {
				expect(body.user).toMatchObject({
					username: 'Bob',
					name: 'Bob Bobberton',
					avatar_url: '/avatars/elephant_avatar.svg',
				});
			});
	});
});

describe('202 PATCH: /api/articles/:article_id', () => {
	test('Should return 202', () => {
		return request(app)
			.patch('/api/articles/2')
			.send({ inc_votes: 1 })
			.expect(202);
	});
	test('Should retrun the correct updated vote', () => {
		return request(app)
			.patch('/api/articles/1')
			.send({ inc_votes: 1 })
			.then(({ body }) => {
				expect(body.vote.votes).toBe(101);
			});
	});
});

describe('204 DELETE: /api/comments/:comment_id', () => {
	test('Should retrun a 204', () => {
		return request(app).delete('/api/comments/1').expect(204);
	});
	test('Should remove the specified comment', () => {
		return request(app)
			.delete('/api/comments/1')
			.expect(204)
			.then(({ body }) => {
				expect(body).toEqual({});
			});
	});
});
