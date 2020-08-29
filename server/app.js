const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

//require dotenv to manage env variables
require("dotenv").config();

//port information
const hostname = '127.0.0.1';
const port = 3000;

//Enable POST
const helmet = require("helmet");
const cors = require("cors");


//Enable Swagger Docs
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");

//Routes
const analysisRouter = require("./routes/analysis");
const tweetsRouter = require("./routes/tweets");
//Init app
const app = express();

//Middleware
app.use(logger("common"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


//middleware for logging
logger.token("req", (req, res) => {
  JSON.stringify(req.headers);
})

logger.token("res", (req, res) => {
  const headers = {};
  res.getHeaderNames().map(h => (headers[h] = res.getHeader(h)));
  return JSON.stringify(headers);
})

//routes setup
app.use("/", analysisRouter);
app.use("/", tweetsRouter)
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

//404 error handling
app.use(function(req, res, next) {
  next(createError(404));
})


//starting app
app.listen(port, function () {
  console.log(`Express app listening at http://${hostname}:${port}/`);
});