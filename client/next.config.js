const withCSS = require('@zeit/next-css');
require('dotenv').config();

module.exports = withCSS({
  cssModules: true,  
  env: {
    API_URL: process.env.API_URL
  }
});