import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import redirect from './api/redirect'
import shortener from './api/shortener'
import * as sapper from '@sapper/server';
import db from './database'

const {
	PORT,
	NODE_ENV
} = process.env;
const dev = NODE_ENV === 'development';

const app = express()

app.use(express.json())

app.use('/api/', redirect)
app.use('/s/', shortener)

app.use(
	compression({
		threshold: 0
	}),
	sirv('static', {
		dev
	}),
	sapper.middleware()
)

app.listen(PORT, err => {
	if (err) console.log('error', err);
});