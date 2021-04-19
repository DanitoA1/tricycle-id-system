import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    riders: []
  },
  mutations: {
    setRiders (state, val) {
      state.riders = val
    }
  },
  actions: {
    async addRider ({ commit }, riderDetails) {
      const status = await fb.ridersCollection.add({
        createdOn: new Date(),
        data: riderDetails
      })
      commit('setValue', status)
      router.push({ name: 'Overview' })
    },
    async getRiders ({ commit }, id) {
      await fb.ridersCollection
        .orderBy('createdOn', 'desc').onSnapshot((snapshot) => {
          const ridersArray = []
          snapshot.forEach((doc) => {
            const rider = doc.data()
            rider.id = doc.id

            ridersArray.push(rider)
          })
          commit('setRiders', ridersArray)
        })
    },
    async updateRider (riderDetails, id) {
      await fb.ridersCollection.doc(id).set({
        createdOn: new Date(),
        data: riderDetails
      })
      router.push({ name: 'Overview' })
    }
  },
  modules: {
  }
})
