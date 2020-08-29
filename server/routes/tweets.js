// middleware import
var express = require("express");
var router = express.Router();

// util import
var twitterUtil = require('../util/twitterUtil');

var params = {
    q: null,
    lang: 'en',
    result_type: 'recent',
    count: 5
}

/* GET METHODS */
router.get("/tweets", async function(req, res, next) {
    //defining the params
    var ticker = req.query.ticker;
    // setting the params to the ticker from the GET method
    params.q = ticker;
    // send the data to the twitter API
    var twitterResp = await twitterUtil.getTweetsText(params).catch((error) => {console.log(error);});

    // sending response back
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(twitterResp), 'utf-8');
})

router.get("/tweets-detailed", async function(req, res, next) {
    //defining the params
    var ticker = req.query.ticker;
    // setting the params to the ticker from the GET method
    params.q = ticker;
    // send the data to the twitter API
    var twitterResp = await twitterUtil.getTweetsDetailed(params).catch((error) => {console.log(error);});

    // sending response back
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(twitterResp), 'utf-8');
})



module.exports = router;