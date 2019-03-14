module.exports = (server) => {
  server.use('/api/auth', require('./auth'))
}