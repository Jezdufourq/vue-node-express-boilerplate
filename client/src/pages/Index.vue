<template>
  <q-page class="flex flex-center row">
    <div>
      <landing-component />
    </div>
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
