<template>
  <div class="row full-width">
    <div class="col-3" />
    <div class="col-6">
      <q-card>
        <div class="q-pa-md">
          <div
            class="q-gutter-md"
            style="max-width: 1000px"
          >
            <div class="text-body1 text-left">
                Enter a stock ticker below, press submit and SentiStock will take care of the rest!
            </div>
              <q-input
                v-model="stockTicker"
                label="Enter a stock ticker"
              />
              <q-btn
                label="Back "
                to="/"
                color="primary"
                flat
                class="q-ml-sm"
              />
              <q-btn
                label="Submit"
                @click="submitStockTicker()"
                type="submit"
                color="primary"
                to="analysis"
              />
          </div>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'homeComponent',
  data () {
    return {
      stockTicker: ''
    }
  },
  methods: {
    submitStockTicker () {
      console.log(this.stockTicker)
    }
  }
}
</script>
