// POST: /url/shortner
// Get: /url/:shortUrltext
// get: /url/list
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./util/db.connect');
const path = require('path');
dotenv.config();
const urlRouter = require('./routers/urlRouter');

const app = express();

app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));


async function startServer() {
	try {
		await connectDB(process.env.MONGO_URL);
		app.listen(3000, () => console.log('server is up..'));
	} catch (error) {
		console.error('Failed to connect to the database:', error);
		process.exit(1);
	}
}

app.use('/url', urlRouter);


startServer();
