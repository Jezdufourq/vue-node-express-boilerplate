const express = require('express')
var cors = require('cors')
const app = express()
const port = 8000

app.use(cors())


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/different-text', (req, res) => {
  res.send('This is a different text!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

