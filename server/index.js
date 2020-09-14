const createError = require("http-errors");
const path = require('path')
const express = require('express')
const port = 3000

require("dotenv").config();

// Middleware
const helmet = require("helmet");
const cors = require("cors");
const logger = require("morgan");

//Enable Swagger Docs
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");

//Routes
const analysisRouter = require("./routes/analysis");
const tweetsRouter = require("./routes/tweets");
const tickerRouter = require("./routes/ticker");
//Init app
const app = express();



// Serve out any static assets correctly
app.use(express.static('../client/dist/spa'))

// Middleware
app.use(logger("common"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//middleware for logging
logger.token("req", (req, res) => {
    JSON.stringify(req.headers);
  })

  logger.token("res", (req, res) => {
    const headers = {};
    res.getHeaderNames().map(h => (headers[h] = res.getHeader(h)));
    return JSON.stringify(headers);
  })

// New api routes should be added here.
// It's important for them to be before the `app.use()` call below as that will match all routes.
//routes setup
app.use("/api", analysisRouter);
app.use("/api", tweetsRouter)
app.use("/api", tickerRouter);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// Any routes that don't match on our static assets or api should be sent to the React Application
// This allows for the use of things like React Router
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/spa', 'index.html'));
})

// middlware to handle errors
// All Status codes
app.use((error, req, res, next) => {
  // logging to console
  console.log('Error status: ', error.status)
  console.log('Message: ', error.message)
  // sets HTTP status code
  // default to 500 for fallback
  res.status(error.status || 500)

  // Sends response
  res.json({
    status: error.status,
    message: error.message,
    stack: error.stack
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
