<template>
  <div>
    <div class="row items-center">
      <div class="col-auto text-h3 q-pa-md text-left text-bold">Tweets</div>
    </div>
    <div class="list scroll q-pa-md" style="height:200px">
      <q-list>
        <q-item
          v-for="tweet in tweets"
          :key="tweet.id"
          clickable
          v-ripple
          @click="searchTweet(tweet.entities.urls[0].url)"
          class="link"
          >
          <q-item-section>
            <q-item-label>{{ tweet.user.screen_name }}</q-item-label>
            <q-item-label caption lines="2">{{ tweet.text }}</q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-chip class="text-caption" color="primary" text-color="white" icon="alarm">
              {{ computedShortTwitterDate(tweet.created_at) }}
            </q-chip>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script>
import { openURL, date } from 'quasar'

export default {
  name: 'tweetsComponent',
  data () {
    return {
      count: '10',
      tweetType: 'Recent',
      tweetOptions: ['Recent', 'Popular']
    }
  },
  computed: {
    twitterDate (payload) {
      const originalTwitterDate = payload
      const currentDate = Date.now()

      const differenceDates = date.getDateDiff(originalTwitterDate, currentDate, 'minutes')
      return date.formatDate(differenceDates, 'm') + 'Minutes ago'
    },
    tweets: {
      get () {
        return this.$store.state.tweets
      },
      set (payload) {
        this.$store.commit('updateTweets', payload)
      }
    },
    stockTicker: {
      get () {
        return this.$store.state.stockTicker
      },
      set (payload) {
        this.$store.commit('updateStockTicker', payload)
      }
    }
  },
  methods: {
    computedShortTwitterDate (payload) {
      const originalTwitterDate = payload
      const currentDate = Date.now()

      const differenceDates = date.getDateDiff(originalTwitterDate, currentDate, 'minutes')
      return date.formatDate(differenceDates, 'm') + ' mins '
    },
    searchTweet (link) {
      console.log(link)
      openURL(link)
    }
  },
  mounted () {
    console.log(this.tweets)
  }
}
</script>
