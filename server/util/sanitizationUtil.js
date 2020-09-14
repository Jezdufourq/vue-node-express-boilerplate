//importing axios for http requests
const axios = require('axios');
var tradingViewTickerSearchUrl = 'https://symbol-search.tradingview.com/symbol_search/?text=';

module.exports = {
    sanitizeStockTickers: async function sanitizeStockTickers(stockTickerStr) {
        return await axios.get(tradingViewTickerSearchUrl + stockTickerStr)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                console.log(error);
            });
        }
}