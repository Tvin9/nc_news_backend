const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const data = require('../db/data/test-data/index');
const request = require('supertest');
const app = require('../app');

beforeEach(() => {
	return seed(data);
});

afterAll(() => {
	return db.end();
});

describe('', () => {
	test('', () => {});
});
