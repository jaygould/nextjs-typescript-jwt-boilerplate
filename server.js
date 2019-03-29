require('dotenv').config();
const express = require('express');

const bodyParser = require('body-parser');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: './ui' });
const handle = app.getRequestHandler();

app
	.prepare()
	.then(() => {
		const server = express();
		server.use(bodyParser.urlencoded({ extended: true }));
		server.use(bodyParser.json());

		server.get('/custom/:id', (req, res) => {
			const actualPage = '/custom';
			const queryParams = { id: req.params.id };
			app.render(req, res, actualPage, queryParams);
		});
		server.get('*', (req, res) => {
			return handle(req, res);
		});

		server.listen(3000, err => {
			if (err) {
				throw err;
			}
			console.log('> Ready on http://localhost:3000');
		});
	})
	.catch(ex => {
		console.error(ex.stack);
		process.exit(1);
	});
