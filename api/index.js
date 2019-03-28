module.exports = (server) => {
  server.use('/api/v1/auth', require('./v1/auth'))
}