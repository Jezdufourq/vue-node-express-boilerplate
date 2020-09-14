<template>
  <div>
    <div class="text-h3 q-pa-md text-left text-bold">Chart</div>
    <div>
      <VueTradingView
        class="q-pa-md"
        :options="{
            symbol: exchangeSymbol + ':' + stockSymbol,
            width: '100%',
        }"
      />
    </div>
  </div>
</template>

<script>
import VueTradingView from 'vue-trading-view'

export default {
  name: 'chartComponent',
  components: {
    VueTradingView
  },
  computed: {
    stockSymbol () {
      return this.$store.state.stockTicker
    },
    exchangeSymbol () {
      return this.$store.state.exchangeSymbol
    }
  }
}
</script>
