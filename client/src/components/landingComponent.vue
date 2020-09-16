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
      <div class="col row text-subtitle">
        <div>Search for a stock ticker below, and then click on the ticker you want to search.</div>
      </div>
      <div class="q-pa-md row items-center">
        <div
          class="col"
          style="width:500px"
        >
          <div class="q-pa-md">
            <div class="row items-center">
              <q-input
                outlined
                debounce="500"
                class="full-width"
                v-model="stockTicker"
                label="Search for Stock Ticker"
                @input="searchTickerQuery"
                clearable
              >
              </q-input>
            </div>
            <div class="q-py-md">
              <q-table
                color="primary"
                style="height:300px"
                :data="stockTickerSearch"
                :columns="stockTickerColumns"
                row-key
                virtual-scroll
                :virtual-scroll-item-size="48"
                @request="searchTickerQuery"
                @row-click="rowClick"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div style="max-height: 300px;width:500px">
          <div class="row items-center">
            <div class="text-h5 q-pa-md text-left text-bold">Your previous searches</div>
            <div class="col-auto">
              <q-btn
                color="primary"
                text-color="white"
                label="Reset"
                @click="resetTickers"
              />
            </div>
          </div>
          <div
            v-if="items.length == 0"
            class="q-pa-md"
            style="height:200px"
          >
            You need to search some items.
          </div>
          <div
            class="list scroll q-pa-md"
            style="height:200px"
          >
            <q-list>
              <q-item
                v-for="item in items"
                :key="item"
                clickable
              >
                <q-item-section class="text-body text-bold">
                  {{ item }}
                </q-item-section>
                <q-item-section side>
                  <q-icon
                    name="search"
                    color="primary"
                    @click="searchTickerFromHistory(item)"
                    class="cursor-pointer"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loading from './loading'
import axios from 'axios'
import notifyError from '../mixins/notifyError'
export default {
  name: 'landingComponent',
  components: {
    loading
  },
  mixins: [notifyError],
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
    },
    exchangeSymbol: {
      get () {
        return this.$store.state.exchangeSymbol
      },
      set (payload) {
        this.$store.commit('updateExchangeSymbol', payload)
      }
    },
    items: {
      get () {
        return this.$store.state.searchHistory
      },
      set (payload) {
        this.$store.commit('updateSearchHistory', payload)
      }
    }
  },
  methods: {
    searchTickerFromHistory (updatedTicker) {
      var promiseArr = []
      this.stockTicker = updatedTicker
      // updating loading state
      this.loadingState = true

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

          // dealing with the second response
          this.tweets = response[1].data
        })
        .catch((error) => {
          this.notifyError(error)
        })
        .finally(() => {
          this.loadingState = false
          this.$router.push('/analysis')
        })
    },
    searchTicker () {
      var promiseArr = []
      // updating search history
      this.$store.commit('updateSearchHistory', this.$store.state.stockTicker)
      // updating loading state
      this.loadingState = true

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

          // dealing with the second response
          this.tweets = response[1].data
        })
        .catch((error) => {
          this.notifyError(error)
        })
        .finally(() => {
          this.loadingState = false
          this.$router.push('/analysis')
        })
    },
    resetTickers () {
      this.$store.commit('resetSearchHistory')
    },
    resetTicker () {
      this.stockTicker = null
    },
    searchTickerQuery (ticker) {
      axios.get('api/search-ticker?ticker=' + ticker)
        .then((response) => {
          this.stockTickerSearch = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    rowClick (evt, row) {
      this.stockTicker = row.symbol
      this.exchangeSymbol = row.exchange
      // the user can search the ticker on the row click
      this.searchTicker()
    }
  },
  mounted () {
    // pre-populating table with common tickers
    axios.get('api/search-top-tickers')
      .then((response) => {
        this.stockTickerSearch = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>
