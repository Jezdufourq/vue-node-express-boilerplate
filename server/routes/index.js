var express = require("express");
var router = express.Router();

//importing twitter service
var twitterService = require("../services/twitter");
var parallelDotsService = require("../services/parallelDots");
const { $for } = require("core-js");

/* GET METHODS */
router.get("/search", function(req, res, next) {
    const str =  'This is a test';

    res.writeHead(200,{'content-type': 'text/html'});
    res.write(str);
    res.end();
});

module.exports = router;