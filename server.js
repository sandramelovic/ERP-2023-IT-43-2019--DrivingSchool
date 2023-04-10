const express = require("express")
const app = express()
const port = process.env.port || 4000
const dbConnection = require('./db')

app.get('/', (req, res) => res.send('Hello world'))
app.listen(port, () => console.log(`Server started on port ${port}`))