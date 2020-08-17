<template>
  <q-page class="flex flex-center">
    <home-component />
  </q-page>
</template>

<script>
import homeComponent from '../components/homeComponent'

export default {
  name: 'Home',
  components: {
    homeComponent
  }
}
</script>
