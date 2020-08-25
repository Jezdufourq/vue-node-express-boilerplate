var express = require("express");
var router = express.Router();

//Twitter service
var Twitter = require("twitter");
var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    bearer_token: process.env.TWITTER_BEARER_TOKEN
});

//Parallel dots
const pd = require('paralleldots');
const { response } = require("express");
pd.apiKey = process.env.PARALLEL_DOTS_API_KEY;

var params = {
    q: null,
    lang: 'en',
    result_type: 'recent',
    count: 5
}
var twitterOutputArr = []

/* GET METHODS */
router.get("/analysis", async function(req, res, next) {
    // TODO: handle the request (i.e put the query into the params object)
    // TODO: need to also sanitise the query (there should be validation on the frontend as well).

    //defining the params
    var ticker = req.query.ticker;
    // setting the params to the ticker from the GET method
    params.q = ticker;

    // send the data to the twitter API
    var parallelResp = await getAnalysis();
    var sentimentResp = await getSentiment(parallelResp);

    // sending response back
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(sentimentResp, 'utf-8');
});

async function getSentiment(parallelResp) {
    return await pd.sentiment(JSON.stringify(parallelResp), 'en')
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log(error);
        })
}

async function getAnalysis() {
    return await client.get('search/tweets', params)
        .then((response) => {
            return response.statuses;
        })
        .catch((error) =>{
            console.log(error);
        });
}

module.exports = router;