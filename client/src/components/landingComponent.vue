<template>
  <div>
    <div
      v-if="loadingState"
      class="relative-position"
    >
      <loading />
    </div>
    <div
      v-if="!loadingState"
      class="column items-center"
      style="max-width: 500px"
    >
      <div class="col row text-h1 text-bold">
        <div>Welcome.</div>
      </div>
      <div class="q-pa-md row items-center">
        <div class="col" style="width:500px">
            <div class="row">
              <q-input
                outlined
                debounce="500"
                class="full-width"
                v-model="stockTicker"
                label="Enter a Stock Ticker"
                @input="validateTicker"
                clearable
              >
              <template v-slot:append>
                <q-icon name="search" type="submit"/>
              </template>
              </q-input>
            </div>
            <div class="q-py-md">
              <q-table
                color="primary"
                class="shadow-2"
                style="width:500px;height:300px"
                :data="stockTickerSearch"
                :columns="stockTickerColumns"
                row-key
                virtual-scroll
                :virtual-scroll-item-size="48"
                @request="validateTicker"
                @row-click="rowClickTest"
              />
            </div>
        </div>
      </div>
    </div>
    <div>
      <history-component />
    </div>
  </div>
</template>

<script>
import historyComponent from './historyComponent'
import loading from './loading'
import axios from 'axios'
export default {
  name: 'landingComponent',
  components: {
    historyComponent,
    loading
  },
  data () {
    return {
      loadingState: false,
      stockTickerSearch: [],
      stockTickerColumns: [
        {
          name: 'symbol',
          required: true,
          label: 'Ticker',
          field: (row) => row.symbol,
          align: 'left',
          sortable: false
        },
        {
          name: 'description',
          required: true,
          label: 'Description',
          field: (row) => row.description,
          align: 'left',
          sortable: false
        },
        {
          name: 'exchange',
          required: true,
          label: 'Exchange',
          field: (row) => row.exchange,
          align: 'left',
          sortable: false
        }
      ]
    }
  },
  computed: {
    stockTicker: {
      get () {
        return this.$store.state.stockTicker
      },
      set (payload) {
        this.$store.commit('updateStockTicker', payload)
      }
    },
    analysisResult: {
      get () {
        return this.$store.state.analysisResult
      },
      set (payload) {
        this.$store.commit('updateAnalysisResult', payload)
      }
    },
    tweets: {
      get () {
        return this.$store.state.tweets
      },
      set (payload) {
        this.$store.commit('updateTweets', payload)
      }
    }
  },
  methods: {
    searchTicker () {
      var promiseArr = []
      // updating search history
      this.$store.commit('updateSearchHistory', this.$store.state.stockTicker)
      // updating loading state
      this.loadingState = true

      console.log(window.location.origin)

      // 1st api call - analysis GET /api/analysis
      promiseArr.push(axios.get('api/analysis?ticker=' + this.stockTicker.toUpperCase()))
      // 2nd api call - tweets GET /api/tweets
      promiseArr.push(axios.get('api/tweets-detailed?ticker=' + this.stockTicker.toUpperCase()))

      Promise.all(promiseArr)
        .then((response) => {
          var analysisObj = {}
          // dealing with the first response
          analysisObj.negative = Math.round(response[0].data.sentiment.negative * 100)
          analysisObj.positive = Math.round(response[0].data.sentiment.positive * 100)
          analysisObj.neutral = Math.round(response[0].data.sentiment.neutral * 100)
          this.analysisResult = analysisObj
          console.log(analysisObj)

          // dealing with the second response
          this.tweets = response[1].data
          console.log(response[1].data)
          console.log(this.tweets)
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          this.loadingState = false
          this.$router.push('/analysis')
        })
    },
    resetTicker () {
      this.stockTicker = null
    },
    validateTicker (ticker) {
      axios.get('api/search-ticker?ticker=' + ticker)
        .then((response) => {
          console.log(response.data)
          this.stockTickerSearch = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    rowClickTest (evt, row) {
      this.stockTicker = row.symbol
    }
  },
  mounted () {
    // pre-populating table with common tickers
    axios.get('api/search-top-tickers')
      .then((response) => {
        console.log(response.data)
        this.stockTickerSearch = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>
