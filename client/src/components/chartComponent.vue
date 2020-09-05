<template>
  <div>
    <div class="text-h3 q-pa-md text-left text-bold">Chart</div>
    <div>
      <VueTradingView
        class="q-pa-md"
        :options="{
            symbol: 'AAPL',
            width: '100%',
        }"
      />
    </div>
  </div>
</template>

<script>
import VueTradingView from 'vue-trading-view'
import store from '../store'

export default {
  name: 'chartComponent',
  components: {
    VueTradingView
  },
  computed: {
    stockSymbol () {
      return store.state.stockTicker
    }
  }
}
</script>
