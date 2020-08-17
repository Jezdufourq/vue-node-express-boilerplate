<template>
  <q-layout view="hhh lpr fff">
    <q-header class="bg-white">
      <div class="column items-center">
        <div class="col row text-h2 text-bold">
          <div class="text-primary">Senti</div>
          <div class="text-black">Stock</div>
        </div>
      </div>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer>
    </q-footer>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  data () {
    return {
    }
  }
}
</script>
