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
    >
      <div class="col row text-h1 text-bold">
        <div>Welcome.</div>
      </div>
      <div class="q-pa-md row items-center">
        <div class="col">
          <q-form
            @submit="searchTicker()"
            @reset="resetTicker()"
          >
            <div class="row">
              <div class="col-auto items-center">
                <q-input
                  outlined
                  v-model="stockTicker"
                  label="Enter a Stock Ticker"
                  :rules="[val => !!val || 'Field is required']"
                />
              </div>
              <div class="col-auto q-pa-sm">
                <q-btn
                  round
                  class="q-ma-sm"
                  icon="search"
                  type="submit"
                  color="primary"
                />
                <q-btn
                  round
                  class="q-ma-sm"
                  icon="clear"
                  type="reset"
                  color="primary"
                />
              </div>
            </div>
          </q-form>
        </div>
      </div>
      <div>
        <history-component />
      </div>
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
      loadingState: false
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

      // 1st api call - analysis GET /api/analysis
      promiseArr.push(axios.get('http://0.0.0.0:3000/analysis?ticker=' + this.stockTicker.toUpperCase()))
      // 2nd api call - tweets GET /api/tweets
      promiseArr.push(axios.get('http://0.0.0.0:3000/tweets-detailed?ticker=' + this.stockTicker.toUpperCase()))

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
    }
  }
}
</script>
