<template>
  <div>
    <div class="text-h3 q-pa-md text-left text-bold">Tweets</div>
     <div class="list scroll q-pa-md" style="height:200px">
      <q-list>
        <q-item
          v-for="tweet in tweets"
          :key="tweet.id"
          clickable
          v-ripple
          >
          <q-item-section>
            <q-item-label>{{ tweet.user.screen_name }}</q-item-label>
            <q-item-label caption lines="2">{{ tweet.text }}</q-item-label>
          </q-item-section>

          <!-- <q-item-section side top>
            <q-item-label caption>{{ tweet.created_at }}</q-item-label>
          </q-item-section> -->
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
    tweets () {
      return this.$store.state.tweets
    }
  },
  mounted () {
    console.log(this.tweets)
  }
}
</script>
