<template>
  <div>
     <div v-if="loadingState" class="relative-position">
      <loading />
    </div>
    <div v-if="!loadingState" class="column items-center">
      <div class="col row text-h1 text-bold">
        <div>Welcome.</div>
      </div>
      <div class="q-pa-md row items-center">
        <div class="col">
          <q-form
            @submit="searchTicker()"
            @reset="resetTicker()"
          >
          <div class="row" >
            <div class="col-auto items-center" >
              <q-input
                outlined
                v-model="stockTicker"
                label="Enter a Stock Ticker"
                :rules="[val => !!val || 'Field is required']"
              />
            </div>
            <div class="col-auto q-pa-sm">
              <q-btn round class="q-ma-sm" icon="search" type="submit" color="primary"/>
              <q-btn round class="q-ma-sm" icon="clear" type="reset" color="primary" />
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
        this.$store.commit('updateStockTicker', payload.toUpperCase())
      }
    }
  },
  methods: {
    searchTicker () {
      // updating search history
      this.$store.commit('updateSearchHistory', this.$store.state.stockTicker.toUpperCase())
      // updating loading state
      this.loadingState = true

      // need to send requests to get the analysis and the tweets
      axios.get('http://localhost:3000/analysis?ticker=' + this.stockTicker.toUpperCase())
        .then((response) => {
          this.negative = Math.round(response.data.sentiment.negative * 100)
          this.positive = Math.round(response.data.sentiment.positive * 100)
          this.neutral = Math.round(response.data.sentiment.neutral * 100)
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
