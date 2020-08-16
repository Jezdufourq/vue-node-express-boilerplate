const express = require('express');
const router  = express.Router();
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swaggerpet.json');

/* Serving Swagger Docs */
router.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

module.exports = router;

