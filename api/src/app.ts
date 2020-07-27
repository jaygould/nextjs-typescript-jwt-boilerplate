// Get dependencies
import express from 'express';
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const errorHandler = require('errorhandler');
const lusca = require('lusca');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Load environment variables
require('dotenv').config();

// Route handlers
const authApi = require('./v1/auth');

// Create server
const app: express.Application = express();

// Express configuration
app.set('port', process.env.API_PORT || process.env.OPENSHIFT_NODEJS_PORT || 3001);
app.use(compression());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

// Error handler
app.use(errorHandler());

// API routes
app.use('/v1/auth', authApi);

export { app };
