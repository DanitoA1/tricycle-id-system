import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    riders: [],
    userProfile: {},
    loginError: {}
  },
  mutations: {
    setUser (state, val) {
      state.user = val
    },
    setLoginError (state, val) {
      state.loginError = val
    },
    setSignUpError (state, val) {
      state.signUpError = val
    },
    setRiders (state, val) {
      state.riders = val
    }
  },
  actions: {
    async login ({ commit }, form) {
      // sign user in
      try {
        const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)
        // fetch user profile and set in state
        commit('setUser', user)
      } catch (error) {
        commit('setLoginError', error)
        console.log(error)
      }
      // change route to calculator
      if (router.currentRoute.path === '/login' || router.currentRoute.path === '/signup') {
        router.push('/admin')
      }
    },
    async fetchUserProfile ({ commit }, user) {
      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get()

      // set user profile in state
      commit('setUserProfile', userProfile.data())
      // change route to dashboard
      if (router.currentRoute.path === '/login' || router.currentRoute.path === '/signup') {
        router.push('/')
      }
    },
    async signup ({ dispatch, commit }, form) {
      // sign user up
      try {
        const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)
        // fetch user profile and set in state
        dispatch('fetchUserProfile', user)
      } catch (error) {
        commit('setSignUpError', error)
        console.log(error)
      }
    },
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
