<template>
  <div>
    <q-card style="height: 650px">
        <div class="text-h3 q-pa-md text-left text-bold">History</div>
        <div class="q-pa-md">
          <q-list>
            <q-item v-for="item in items" :key="item.ticker" clickable v-ripple>
              <q-item-section class="text-body text-bold">
                {{ item.ticker }}
              </q-item-section>
              <q-item-section side>
                <q-icon name="search" color="primary" />
              </q-item-section>
            </q-item>
          </q-list>
        </div>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'historyComponent',
  data () {
    return {
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
  }
}
</script>
