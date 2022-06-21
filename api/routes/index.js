const express = require('express')
// List all routers here like:
// const testRouter = require('./test')
const deviceRouter = require('./device')
const notificationRouter = require('./message')

const app = express()

app.use('/device', deviceRouter)
app.use('/notifications',notificationRouter)


module.exports = app
