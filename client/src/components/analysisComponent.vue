<template>
  <div>
    <q-card style="height: 650px">
        <q-card-section>
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
        </q-card-section>
        <q-card-actions align="center">
          <q-btn color="primary" to="home">Search Again</q-btn>
        </q-card-actions>
        <!-- <q-card-section>
          <div class="q-pa-md">
            <q-list>
              <q-item v-for="item in items" :key="item" clickable v-ripple>
                <q-item-section class="text-body text-bold">
                  {{ item.body }}
                </q-item-section>
                <q-item-section class="text-body text-bold">
                  {{ item.from }}
                </q-item-section>
                <q-item-section side>
                  <q-icon name="search" color="primary" />
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </q-card-section> -->
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'analysisComponent',
  data () {
    return {
      items: [
        {
          body: 'This is a test',
          from: '@jezdufourq'
        },
        {
          body: 'This is a test 2 ',
          from: '@jezdufourq'
        }
      ]
    }
  }
}
</script>
