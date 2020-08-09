<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn
      color="white"
      text-color="black"
      label="Standard"
      @click="sendEvent()"
    />
    <div class="q-pa-md q-gutter-sm">
      <div class="text-title">{{buttonPressed}}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'MainLayout',
  data () {
    return {
      buttonPressed: ''
    }
  },
  methods: {
    sendEvent () {
      axios.get('http://localhost:8000/different-text')
        .then((response) => {
          this.buttonPressed = response.data
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
