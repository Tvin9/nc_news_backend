function getLookup(objArr, key, value) {
	const lookupObj = {};

	for (let i = 0; i < objArr.length; i++)
		lookupObj[objArr[i][key]] = objArr[i][value];

	return lookupObj;
}

module.exports = getLookup;
