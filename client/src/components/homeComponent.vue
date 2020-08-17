<template>
  <div class="row full-width">
    <div class="col-3" />
    <div class="col-6">
      <q-card>
        <div class="q-pa-md">
          <div
            class="q-gutter-md"
            style="max-width: 1000px"
          >
            <q-form
              @submit="onSubmit"
              @reset="onReset"
              class="q-gutter-md"
              align="right"
            >
            <div class="text-body1 text-left">
                Enter a stock ticker below, press submit and SentiStock will take care of the rest!
            </div>
              <q-input
                v-model="text"
                label="Enter a stock ticker"
              />
              <q-btn
                label="Back "
                to="/"
                color="primary"
                flat
                class="q-ml-sm"
              />
              <q-btn
                label="Submit"
                type="submit"
                color="primary"
                to="analysis"
              />
            </q-form>
          </div>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'homeComponent',
  methods: {
    onSubmit () {
    }
  }
}
</script>
