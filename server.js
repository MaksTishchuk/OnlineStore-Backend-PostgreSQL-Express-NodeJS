require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const path = require('path')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const fs = require("fs");

const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.resolve(__dirname, 'static', 'images')))
app.use(fileUpload({}))
app.use('/api', router)

// Middleware with errors must be in the end
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => {
            console.log(`Server has been started on port ${PORT}`)
        })
        if (!fs.existsSync('static')) {
          fs.mkdirSync('static')
       }
       if (!fs.existsSync('static/images')) {
          fs.mkdirSync('static/images')
       }
    } catch (e) {
        console.log(`Error:`, e)
    }
}

start()
