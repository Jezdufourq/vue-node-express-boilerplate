// importing middleware
var express = require("express");
const asyncHandler = require('express-async-handler');
var router = express.Router();

// util import
var tradingViewUtil = require('../util/tradingviewUtil');

router.get("/search-ticker", asyncHandler(async function(req, res, next) {
    var stockTicker = req.query.ticker;
    var tradingViewResp = await tradingViewUtil.searchStockTickers(stockTicker).catch((error) => {console.log(error)});
    res.send(tradingViewResp);
}));

router.get("/search-top-tickers", asyncHandler(async function(req, res, next) {
    var tradingViewResp = await tradingViewUtil.searchTopStockTickers().catch((error) => {console.log(error)});
    res.send(tradingViewResp);
}));

module.exports = router;