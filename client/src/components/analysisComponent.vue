<template>
  <div>
    <div>
      <div class="text-h3 q-pa-md text-left text-bold">Analysis</div>
      <div>
        <div class="text-h3 q-py-md text-center text-bold">{{ stockTicker }}</div>
        <div class="row items-center">
          <div class="col justify-center">
            <div class="row col justify-center">
              <q-icon
                name="mood"
                size="4rem"
              />
            </div>
            <div class="text-body text-primary text-center q-py-md">{{ negative }}%</div>
          </div>
          <div class="col justify-center">
            <div class="row col justify-center">
              <q-icon
                name="face"
                size="4rem"
              />
            </div>
            <div class="text-body text-primary text-center q-py-md">{{ neutral }}%</div>
          </div>
          <div class="col justify-center">
            <div class="row col justify-center">
              <q-icon
                name="mood_bad"
                size="4rem"
              />
            </div>
            <div class="text-body text-primary  text-center q-py-md">{{ positive }}%</div>
          </div>
        </div>
      </div>
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
  </div>
</template>

<script>
import axios from 'axios'
import store from '../store'

export default {
  name: 'analysisComponent',
  data () {
    return {
      stockTicker: null,
      negative: null,
      positive: null,
      neutral: null
    }
  },
  methods: {
    searchTicker () {
      console.log(this.stockTicker.toUpperCase())
      axios.get('api/analysis?ticker=' + this.stockTicker.toUpperCase())
        .then((response) => {
          this.negative = Math.round(response.data.sentiment.negative * 100)
          this.positive = Math.round(response.data.sentiment.positive * 100)
          this.neutral = Math.round(response.data.sentiment.neutral * 100)
        })
        .catch((error) => {
          console.log(error)
        })

      // updating the vuex store
      store.commit('updateStockTicker', this.stockTicker.toUpperCase())
      store.commit('updateSearchHistory', this.stockTicker.toUpperCase())
    }
  }
}
</script>
