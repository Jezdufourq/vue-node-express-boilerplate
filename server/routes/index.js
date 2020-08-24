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


/* GET METHODS */
router.get("/search", function(req, res, next) {
    client.get('search/tweets', params, gotData);
});


function gotData(err, data, res) {
    var outputArr = []
    console.log(data);
    data.statuses.forEach((element) => {
        outputArr.push(element.text);
        console.log(element.text);
    })
    var parallelDotsArr = JSON.stringify(outputArr);

    pd.sentiment(parallelDotsArr, 'en')
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })
}

module.exports = router;