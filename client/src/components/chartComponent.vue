<template>
  <div>
    <q-card style="height: 650px">
        <div class="text-h3 q-pa-md text-left text-bold">Chart</div>
        <div>
            <VueTradingView class="q-pa-md" :options="{
                symbol: 'NASDAQ:AAPL',
                width: '100%',
            }"/>
        </div>
    </q-card>
  </div>
</template>

<script>
import VueTradingView from 'vue-trading-view'

export default {
  name: 'chartComponent',
  components: {
    VueTradingView
  }
}
</script>
