const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const { sequelize } = require('./models')
require('dotenv').config()

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

require('./routes')(app)

sequelize.sync() // {force: true}
  .then(() => {
    app.listen(process.env.PORT)
    console.log(`Servidor inicializado en puerto ${process.env.PORT}`)
  })
