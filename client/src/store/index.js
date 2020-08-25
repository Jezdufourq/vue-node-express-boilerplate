import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state: {
      stockTicker: null,
      searchHistory: []
    },
    mutations: {
      updateStockTicker (state, payload) {
        state.stockTicker = payload
      },
      updateSearchHistory (state, payload) {
        state.searchHistory.push(payload)
      }
    },
    getters: {
      getStockTicker: state => {
        return state.stockTicker
      },
      getSearchHistory: state => {
        return state.searchHistory
      }
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
