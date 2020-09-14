//importing axios for http requests
const axios = require('axios');

var tradingViewTickerSearchUrl = 'https://symbol-search.tradingview.com/symbol_search/?text=';
var tradingViewTopTickersUrl = 'https://symbol-search.tradingview.com/symbol_search';

module.exports = {
    searchStockTickers: async function searchStockTickers(stockTickerStr) {
        return await axios.get(tradingViewTickerSearchUrl + stockTickerStr)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                console.log(error);
            });
        },
    searchTopStockTickers: async function searchTopStockTickers() {
        return await axios.get(tradingViewTopTickersUrl)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            })
    }
}