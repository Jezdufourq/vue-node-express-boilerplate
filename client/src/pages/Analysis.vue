<template>
  <q-page>
    <div class="row justify-center q-py-md">
      <div class="col-auto">
        <q-btn
          color="primary"
          icon="home"
          label="Go Home"
          to="/"
        />
      </div>
    </div>
    <div class="row flex flex-center">
      <div class="col-4 q-px-md">
        <tweets-component />
        <history-component />
      </div>
      <div class="col-4 q-px-md">
        <analysis-component />
      </div>
      <div class="col-4 q-px-md">
        <chart-component />
      </div>
    </div>
  </q-page>
</template>

<script>
import analysisComponent from '../components/analysisComponent'
import tweetsComponent from '../components/tweetsComponent'
import chartComponent from '../components/chartComponent'
import historyComponent from '../components/historyComponent'

export default {
  name: 'Analysis',
  components: {
    analysisComponent,
    tweetsComponent,
    chartComponent,
    historyComponent
  }

}
</script>
