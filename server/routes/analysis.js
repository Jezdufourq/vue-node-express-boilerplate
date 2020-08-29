// middleware import
var express = require("express");
var router = express.Router();

// util import
var parallelDotsUtil = require('../util/parallelDotsUtil');
var twitterUtil = require('../util/twitterUtil');

// default query params
var params = {
    q: null,
    lang: 'en',
    result_type: 'recent',
    count: 5
}

/* GET METHOD */
router.get("/analysis", async function(req, res, next) {
    // TODO: handle the request (i.e put the query into the params object)
    // TODO: need to also sanitise the query (there should be validation on the frontend as well).

    // setting the params to the ticker from the GET method
    params.q = req.query.ticker;

    // send the data to the twitter API
    var twitterResp = await twitterUtil.getTweetsText(params);
    var sentimentResp =  await parallelDotsUtil.getParallelDotsSentiment(twitterResp);

    // sending response back
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(sentimentResp, 'utf-8');
});

module.exports = router;