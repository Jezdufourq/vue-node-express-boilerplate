<template>
  <q-page class="row flex flex-center q-gutter-md">
    <div class="col-3">
      <history-component />
    </div>
    <div class="col-3">
      <analysis-component />
    </div>
    <div class="col-3">
      <chart-component />
    </div>
  </q-page>
</template>

<script>
import analysisComponent from '../components/analysisComponent'
import historyComponent from '../components/historyComponent'
import chartComponent from '../components/chartComponent'

export default {
  name: 'Analysis',
  components: {
    analysisComponent,
    historyComponent,
    chartComponent
  }

}
</script>
