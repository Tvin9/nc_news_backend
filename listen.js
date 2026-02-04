const app = require('./app');

const port = 9876;

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
