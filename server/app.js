const express = require('express');
var cors = require('cors');
const app = express();
const port = 8000;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

/* Logging methods */
function logOriginalUrl(req, res, next) {
  console.log('Request URL: ' + req.originalUrl);
  next()
}

function logMethod(req, res, next) {
  console.log('Request Type: ' + req.method);
  next()
}

const logging = [logOriginalUrl, logMethod]

app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/different-text', (req, res) => {
  res.send('This is a different text!')
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

