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
    q: '$APT',
    lang: 'en',
    result_type: 'recent',
    count: 10
}
var twitterOutputArr = []

/* GET METHODS */
router.get("/tweets", async function(req, res, next) {
    //defining the params
    var ticker = req.query.ticker;
    // setting the params to the ticker from the GET method
    params.q = ticker;
    // send the data to the twitter API
    var parallelResp = await getAnalysis();

    // sending response back
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(parallelResp), 'utf-8');
})

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