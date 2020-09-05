<template>
  <div>
    <div class="text-h5 q-pa-md text-left text-bold">Your previous searches</div>
    <div class="q-pa-md">
      <q-list>
        <q-item
          v-for="item in items"
          :key="item.ticker"
          clickable
          v-ripple
        >
          <q-item-section class="text-body text-bold">
            {{ item.ticker }}
          </q-item-section>
          <q-item-section side>
            <q-icon
              name="search"
              color="primary"
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
      items: []
    }
  }
}
</script>
