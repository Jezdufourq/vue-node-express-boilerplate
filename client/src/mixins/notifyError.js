export default {
  // notifies user of an error
  methods: {
    notifyError (error) {
      try {
        if (error.response.data.message === undefined) throw TypeError
        this.$q.notify({
          progress: true,
          position: 'top',
          message: error.response.data.message,
          type: 'negative',
          timeout: 5000,
          actions: [{
            icon: 'close',
            color: 'white'
          }]
        })
      } catch (TypeError) {
        this.$q.notify({
          progress: true,
          position: 'top',
          message: error.message,
          type: 'negative',
          timeout: 5000,
          actions: [{
            icon: 'close',
            color: 'white'
          }]
        })
      }
    }
  }
}
