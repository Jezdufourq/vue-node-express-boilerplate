<template>
  <div>
    <div class="row items-center">
      <div class="col-auto text-h3 q-pa-md text-left text-bold">Tweets</div>
    </div>
    <q-form
      @submit="searchTweets">
      <div class="row items-center">
        <q-input
          filled
          v-model="count"
          name="count"
          label="# of tweets"
          class="col-3"
        />
        <q-select filled v-model="tweetType" :options="tweetOptions" label="Tweets option" class="col-4"/>
        <div class="col-auto q-pa-sm">
          <q-btn color="primary" label="Search" type="submit" text-color="white" @click="refreshTweets"/>
        </div>
      </div>
    </q-form>
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
import axios from 'axios'
import { date } from 'quasar'
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
    refreshTweets () {
      axios.get('/api/tweets-detailed?ticker=' + this.stockTicker)
        .then((response) => {
          console.log(response.data)
          this.tweets = response.data
        })
    },
    searchTweets () {
      console.log('search tweets')
    },
    computedShortTwitterDate (payload) {
      const originalTwitterDate = payload
      const currentDate = Date.now()

      const differenceDates = date.getDateDiff(originalTwitterDate, currentDate, 'minutes')
      return date.formatDate(differenceDates, 'm') + ' mins '
    }
  },
  mounted () {
    console.log(this.tweets)
  }
}
</script>
