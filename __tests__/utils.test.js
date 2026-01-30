const getLookup = require('../db/seeds/utils');

describe('Lookup Function', () => {
	test('Should return an empty object when passed an empty array', () => {
		const input = [{}];
		const expected = {};

		expect(getLookup(input, 'sausage', 'chips')).toEqual(expected);
	});
	test('Should return an object with a key: value pair when passed one object', () => {
		const input = [{ dogs: 'good', cats: 'also_good' }];
		const expected = { good: 'also_good' };

		expect(getLookup(input, 'dogs', 'cats')).toEqual(expected);
	});
	test('Should return multiple key value pairs when passed multiple objects', () => {
		const input = [
			{ name: 'Shiraz', vol: '13.5%', country: 'Australia' },
			{ name: 'Malbec', vol: '13', country: 'Argentina' },
			{ name: 'Riesling', vol: '11', country: 'Germany' },
		];
		expected = {
			Shiraz: 'Australia',
			Malbec: 'Argentina',
			Riesling: 'Germany',
		};

		expect(getLookup(input, 'name', 'country')).toEqual(expected);
	});
	test('Should not mutate the original array', () => {
		const input = [
			{ bird_type: 'crow', alignment: 'chaotic good' },
			{ bird_type: 'seagull', alignment: 'chaotic evil' },
		];

		const inputCopy = [
			{ bird_type: 'crow', alignment: 'chaotic good' },
			{ bird_type: 'seagull', alignment: 'chaotic evil' },
		];

		getLookup(input, 'bird_type', 'alignment');
		expect(input).toEqual(inputCopy);
	});
});
