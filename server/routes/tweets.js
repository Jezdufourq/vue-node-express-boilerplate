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
    // query sanitization
    if(!req.query) {
        const err = new Error('Required query params missing. You must enter a stock ticker.');
        err.status = 400;
        next(err);
    }
    if(!req.query.ticker) {
        const err = new Error('Required query params missing. You must enter a stock ticker.');
        err.status = 400;
        next(err);
    }
    if(!req.query.count) {
        params.count = 10 // setting default to 10
    }
    if(!req.query.type) {
        params.result_type = 'recent' // setting default to 10
    }
    if(!req.query.lang) {
        params.lang = 'en' // setting default to 10
    }

    // TODO: Need to add sanitization on the ticker query
    // settings params
    params.q = req.query.ticker;
    params.count = req.query.count;
    params.result_type = req.query.type;
    params.lang = req.query.lang;
    // send the data to the twitter API
    var twitterResp = await twitterUtil.getTweetsText(params).catch((error) => {console.log(error);});

    // sending response back
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(twitterResp), 'utf-8');
})

router.get("/tweets-detailed", async function(req, res, next) {
    // query sanitization
    if(!req.query) {
        const err = new Error('Required query params missing. You must enter a stock ticker.');
        err.status = 400;
        next(err);
    }
    if(!req.query.ticker) {
        const err = new Error('Required query params missing. You must enter a stock ticker.');
        err.status = 400;
        next(err);
    }
    if(!req.query.count) {
        params.count = 10 // setting default to 10
    }
    if(!req.query.type) {
        params.result_type = 'recent' // setting default to 10
    }
    if(!req.query.lang) {
        params.lang = 'en' // setting default to 10
    }

    // TODO: Need to add sanitization on the ticker query
    // settings params
    params.q = req.query.ticker;
    params.count = req.query.count;
    params.result_type = req.query.type;
    params.lang = req.query.lang;
    // send the data to the twitter API
    var twitterResp = await twitterUtil.getTweetsDetailed(params).catch((error) => {console.log(error);});

    // sending response back
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(twitterResp), 'utf-8');
})



module.exports = router;