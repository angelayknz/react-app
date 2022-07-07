//module require express, mongoose
//commonJS import, eg. css, components, funcs
const express = require('express')
const app = express()
const dotevn = require('dotenv')
const mongoose = require('mongoose')

dotevn.config()

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use('/', (req, res) => {})

app.listen('5000', () => {
  console.log('Backend is running on port 5000')
})
