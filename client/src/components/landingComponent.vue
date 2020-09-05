<template>
  <div>
    <div class="column items-center">
      <div class="col row text-h1 text-bold">
        <div>Welcome.</div>
      </div>
      <div class="q-pa-md row items-center">
        <div class="col">
          <q-input
            outlined
            bottom-slots
            v-model="stockTicker"
            label="Enter a Stock Ticker"
          >
            <template v-slot:append>
              <q-icon
                name="search"
                color="primary"
                @click="searchTicker()"
                class="cursor-pointer"
              />
            </template>
          </q-input>
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
export default {
  name: 'landingComponent',
  components: {
    historyComponent
  },
  data () {
    return {
      stockTicker: ''
    }
  },
  methods: {
    searchTicker () {
      // this.loadingState = true
      // console.log(this.stockTicker.toUpperCase())
      // axios.get('http://localhost:3000/analysis?ticker=' + this.stockTicker.toUpperCase())
      //   .then((response) => {
      //     this.negative = Math.round(response.data.sentiment.negative * 100)
      //     this.positive = Math.round(response.data.sentiment.positive * 100)
      //     this.neutral = Math.round(response.data.sentiment.neutral * 100)
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //   })
      //   .finally(() => {
      //     this.loadingState = false
      //   })

      // // updating the vuex store
      // store.commit('updateStockTicker', this.stockTicker.toUpperCase())
      // store.commit('updateSearchHistory', this.stockTicker.toUpperCase())
    }
  }
}
</script>
