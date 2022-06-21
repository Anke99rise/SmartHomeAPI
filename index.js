const express = require('express')
const config = require('./config')
const logger = require('morgan')
const cors = require('cors')

const app = express()

const http = require('http').createServer(app)

const port = process.env.PORT || config.port

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

if (process.env.NODE_ENV !== 'test') app.use(logger('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Allow cors
app.use(cors())

// routes
const apiRouter = require('./api/routes')

// Define routes
app.use('/static', express.static('public'))
app.use('/api', apiRouter)

// 404 response
app.all('*', (req, res) =>
    res.status(404).json({
        status: 404,
        message: 'Page not found.',
    })
)

// Unauthorized error
app.use((err, req, res) => {
    if (err.name === 'UnauthorizedError')
        res.status(404).json({
            status: 401,
            message: 'Unauthorized',
        })
})

// Setup app and listen
http.listen(port, () => {
    console.log('API service started on port: ' + port)
})