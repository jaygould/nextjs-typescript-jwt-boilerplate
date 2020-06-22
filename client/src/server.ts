require('dotenv').config();
import express, { Request, Response } from "express";
const bodyParser = require('body-parser');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: './src' });
const handle = app.getRequestHandler();

app
	.prepare()
	.then(() => {
		const server = express();
		server.use(bodyParser.urlencoded({ extended: true }));
		server.use(bodyParser.json());

		server.get('/custom/:id', (req: express.Request, res: express.Response) => {
			const actualPage = '/custom';
			const queryParams = { id: req.params.id };
			app.render(req, res, actualPage, queryParams);
		});
		server.get('*', (req: express.Request, res: express.Response) => {
			return handle(req, res);
		});

		server.listen(3000, (err: express.Errback) => {
			if (err) {
				throw err;
			}
			console.log('> Ready on http://localhost:3000');
		});
	})
	.catch((ex: any) => {
		console.error(ex.stack);
		process.exit(1);
	});
