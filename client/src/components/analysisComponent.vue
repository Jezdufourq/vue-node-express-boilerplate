<template>
  <div>
    <div v-if="loadingState" class="relative-position">
      <loading />
    </div>
    <div v-if="!loadingState" class="relative-position">
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
                  color="positive"
                />
              </div>
              <div class="text-body text-primary text-center q-py-md">{{ analysisResult.negative }}%</div>
            </div>
            <div class="col justify-center">
              <div class="row col justify-center">
                <q-icon
                  name="face"
                  size="4rem"
                  color="primary"
                />
              </div>
              <div class="text-body text-primary text-center q-py-md">{{ analysisResult.neutral }}%</div>
            </div>
            <div class="col justify-center">
              <div class="row col justify-center">
                <q-icon
                  name="mood_bad"
                  size="4rem"
                  color="negative"
                />
              </div>
              <div class="text-body text-primary  text-center q-py-md">{{ analysisResult.positive }}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loading from './loading'

export default {
  name: 'analysisComponent',
  components: {
    loading
  },
  computed: {
    analysisResult () {
      return this.$store.state.analysisResult
    },
    stockTicker () {
      return this.$store.state.stockTicker
    }
  },
  data () {
    return {
    }
  }
}
</script>
