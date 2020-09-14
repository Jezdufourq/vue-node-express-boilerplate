// import middleware
const pd = require('paralleldots');

// defining parallel dots middleware params
pd.apiKey = process.env.PARALLEL_DOTS_API_KEY;


/* UTIL METHOD SECTION */
/* getParallelDotsSentiment()
Description - gets the sentiment of a textArr using the ParallelDots API. Returns a promise.
Input -
Output -
*/
module.exports = {
    getParallelDotsSentiment: async function getParallelDotsSentiment(textArr) {
        return await pd.sentiment(JSON.stringify(textArr), 'en')
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.log(error);
            })
    }
}



