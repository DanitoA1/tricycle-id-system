<template>
  <v-container>
    <div
      class="mt-6"
    >
      <div
        class="text-center"
      >
        <img
          height="75px"
          width="70px"
          src="/img/image 1.svg"
          alt="logo"
        >
      </div>
      <div
        class="text-center"
      >
        <img
          height="40px"
          width="120"
          src="/img/valuehandlersLogo.png"
          alt="logo">
      </div>
    </div>
    <v-card
      class="mx-auto mt-10"
      shaped
      max-width="400"
      color="#FCF4F8"
    >
      <v-toolbar
        color="#9B2D86"
        dense
        dark
      >
        <v-card-title
          class="mx-auto"
        >
          Login To Use Calculator
        </v-card-title>
      </v-toolbar>
      <v-container
        class="mt-4"
      >
        <v-text-field
          class="my-3"
          color="#9B2D86"
          outlined
          rounded
          dense
          label="Email"
          type="email"
          :error-messages="emailErr ? errMsg:''"
          @click="emailErr = false"
          v-model.trim="loginData.email"
          hint="Enter a registered email"
        />
        <v-text-field
          class="my-3"
          color="#9B2D86"
          outlined
          rounded
          dense
          label="Password"
          type="password"
          :error-messages="passErr ? errMsg: ''"
          @click="passErr = false"
          v-model.trim="loginData.password"
          hint="Enter your password"
        />
        <v-container
          v-if="otherErr"
          class="text-center mt-n4"
        >
          <p
            class="text-caption red--text mt-n4"
          >
            {{ errMsg }}
          </p>
        </v-container>
        <div class="text-center">
          <div
            v-if="!loader"
          >
            <v-btn
              class="mb-2 text-capitalize"
              color="#9B2D86"
              rounded
              dark
              @click="login()"
            >
              Login
            </v-btn>
          </div>
          <div
            v-else
          >
            <v-progress-circular
              indeterminate
              color="#9B2D86"
            ></v-progress-circular>
          </div>
          <!--p>OR</p>
          <v-btn
            class="mb-3 mt-n3 text-capitalize blue--text"
            rounded
            @click="loginNow()"
          >
            <v-avatar
              class="mr-3"
              size="25"
            >
              <img
                src="/img/googleLogo.png"
                alt="G"
              />
            </v-avatar>
            Login with Google
          </v-btn-->
          <p
            class="text-caption"
          >
            Don't have an account?
            <v-btn
              class="deep-purple--text ml-n2 text-capitalize"
              text
              rounded
              small
              to="/signup"
            >
              Sign Up
            </v-btn>
          </p>
        </div>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import { auth } from '@/firebase'
import firebase from 'firebase'
import { mapState } from 'vuex'

export default {
  name: 'Login',
  data: () => ({
    loader: false,
    loginData: {
      email: '',
      password: ''
    },
    reset: {
      email: ''
    },
    errMsg: '',
    passErr: false,
    emailErr: false,
    loginSuccess: false,
    otherErr: false
  }),
  computed: {
    ...mapState(['loginError'])
  },
  watch: {
    loginError (val) {
      this.loader = false
      if (val.code === 'auth/user-not-found') {
        this.emailErr = true
        this.errMsg = 'Not a registered Email'
      } else if (val.code === 'auth/wrong-password') {
        this.passErr = true
        this.errMsg = val.message
      } else {
        this.otherErr = true
        this.errMsg = val.message
      }
    }
  },
  created () {
    firebase.auth().onAuthStateChanged((userAuth) => {
      if (userAuth) {
        firebase
          .auth()
          .currentUser.getIdTokenResult()
          .then((tokenResult) => {
            console.log(tokenResult.claims)
          })
      }
    })
  },
  methods: {
    async login () {
      this.otherErr = false
      this.loader = true
      this.errMsg = ''
      await this.$store.dispatch('login', {
        email: this.loginData.email,
        password: this.loginData.password
      })
      this.loader = false
      if (this.errMsg === '') {
        this.loginSuccess = true
      }
    },
    async resetPassword () {
      this.errorMsg = ''

      try {
        await auth.sendPasswordResetEmail(this.reset.email)
        this.resetSuccess = true
      } catch (err) {
        this.errorMsg = err.message
      }
    },
    loginNow () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const token = result.credential.accessToken
          console.log(token)
          // The signed-in user info.
          const { user } = result
          console.log(user)
          // ...
          this.$router.push('/')
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code
          const errorMessage = error.message
          console.log(errorCode, errorMessage)
          // The email of the user's account used.
          const { email } = error
          // The firebase.auth.AuthCredential type that was used.
          const { credential } = error
          console.log(email, credential)
          // ...
        })
    }
  }
}
</script>
