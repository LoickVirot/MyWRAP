const server = require('server')
const { get, post } = server.router
const mongoose = require('mongoose')

mongoose.connect(require('./config/database'), { useMongoClient: true })
mongoose.Promise = global.Promise

server(
  require('./config/server'),
  ctx => {
    ctx.mongoose = mongoose
  },
  ctx => {
    expect(ctx.secure).toBe(true);
  },
  require('./api/routes.js')
)
