<template>
  <div style="max-height: 300px;width:500px">
    <div class="row items-center">
      <div class="text-h5 q-pa-md text-left text-bold">Your previous searches</div>
      <div class="col-auto">
        <q-btn color="primary" text-color="white" label="Reset" @click="resetTickers"/>
      </div>
    </div>
    <div v-if="items.length == 0" class="q-pa-md" style="height:200px">
      You need to search some items.
    </div>
    <div class="list scroll q-pa-md" style="height:200px">
      <q-list>
        <q-item
          v-for="item in items"
          :key="item"
          clickable
        >
          <q-item-section class="text-body text-bold">
            {{ item }}
          </q-item-section>
          <q-item-section side>
            <q-icon
              name="search"
              color="primary"
              @click="updateTicker(item)"
              class="cursor-pointer"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tweetsComponent',
  data () {
    return {
    }
  },
  computed: {
    items: {
      get () {
        return this.$store.state.searchHistory
      },
      set (payload) {
        this.$store.commit('updateSearchHistory', payload)
      }
    }
  },
  methods: {
    updateTicker (ticker) {
      this.$store.commit('updateStockTicker', ticker)
    },
    resetTickers () {
      this.$store.commit('resetSearchHistory')
    }
  }
}
</script>
