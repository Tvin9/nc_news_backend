const app = require('./app.js');

const port = 9000;

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
