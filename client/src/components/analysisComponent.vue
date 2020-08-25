<template>
  <div>
    <div>
      <div class="text-h3 q-pa-md text-left text-bold">Analysis</div>
      <div>
        <div class="text-h3 q-py-md text-center text-bold">A2M</div>
        <div class="row items-center">
          <div class="col justify-center">
            <div class="row col justify-center"><q-icon name="mood" size="4rem"/></div>
            <div class="text-body text-center q-py-md">10%</div>
          </div>
          <div class="col justify-center">
            <div class="row col justify-center"><q-icon name="face" size="4rem"/></div>
            <div class="text-body text-center q-py-md">10%</div>
          </div>
          <div class="col justify-center">
            <div class="row col justify-center"><q-icon name="mood_bad" size="4rem"/></div>
            <div class="text-body text-center q-py-md">10%</div>
          </div>
        </div>
      </div>
    </div>
    <div class="q-pa-md row items-center">
      <div class="col">
        <q-input outlined bottom-slots v-model="stockTicker" label="Enter a Stock Ticker" lazy-rules>
          <template v-slot:after>
            <q-btn round dense icon="search" color="primary"/>
          </template>
        </q-input>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'analysisComponent',
  data () {
    return {
      stockTicker: null,
      items: [
        {
          ticker: 'A2M'
        },
        {
          ticker: 'ALU'
        },
        {
          ticker: 'BLU'
        }
      ]
    }
  },
  methods: {
    searchTicker () {
      console.log('this button has been pressed')
    }
  }
}
</script>
