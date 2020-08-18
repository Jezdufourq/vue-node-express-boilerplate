<template>
  <div>
    <q-card style="height: 650px">
        <q-card-section>
          <div class="text-h3 q-pa-md text-left text-bold">Analysis</div>
          <div>
            <div class="text-h3 q-py-md text-center text-bold">A2M</div>
            <div class="row">
              <q-icon name="mood" size="4rem"/>
              <q-icon name="mood_bad" size="4rem"/>
              <q-icon name="font_download" size="4rem"/>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn color="primary" to="home">Search Again</q-btn>
        </q-card-actions>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'analysisComponent'
}
</script>
