<template>
  <q-page class="flex flex-center row">
    <landing-component />
  </q-page>
</template>

<script>
import landingComponent from '../components/landingComponent'

export default {
  name: 'Index',
  components: {
    landingComponent
  }
}
</script>
