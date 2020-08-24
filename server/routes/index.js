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
pd.apiKey = process.env.PARALLEL_DOTS_API_KEY;

var params = {
    q: '$APT',
    lang: 'en',
    result_type: 'recent',
    count: 50
}
var twitterOutputArr = []

/* GET METHODS */
router.get("/search", async function(req, res, next) {
    // TODO: handle the request (i.e put the query into the params object)
    // TODO: need to also sanitise the query (there should be validation on the frontend as well).

    //defining the params
    var ticker = req.query.ticker;
    // setting the params to the ticker from the GET method
    params.q = ticker;

    // send the data to the twitter API
    var twitterData = await getTwitterData();

    // get the sentiment
    var parallelResp = await getParallelData(twitterData);

    // sending response back
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(parallelResp), 'utf-8');
});


async function getParallelData(twitterData) {
    var parallelDotsArr = JSON.stringify(twitterOutputArr);
    console.log(parallelDotsArr);
    pd.sentiment(parallelDotsArr, 'en')
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })
}
async function getTwitterData(err, data, res) {
    var outputArr = []
    client.get('search/tweets', params)
        .then((res) => {
            res.statuses.forEach((element) => {
                outputArr.push(element.text);
            })
        })
        .catch((err) =>{
            console.log(err);
        });
    return outputArr
}

module.exports = router;