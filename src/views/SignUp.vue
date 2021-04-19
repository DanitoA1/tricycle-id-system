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
          Create An Account
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
          hint="Enter a Valid Email"
          :error-messages="emailErr ? errMsg:''"
          @click="emailErr = false"
          v-model.trim="signUpData.email"
        />
        <v-text-field
          class="my-3"
          color="#9B2D86"
          outlined
          rounded
          dense
          label="Password"
          hint="Enter Password"
          v-model.trim="signUpData.password"
          :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append="showPassword = !showPassword"
          :type="showPassword ? 'text' : 'password'"
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
              @click="signup()"
            >
              Sign Up
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
            class="mb-3 mt-n1 text-capitalize blue--text"
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
            Sign Up with Google
          </v-btn-->
          <p
            class="text-caption"
          >
            Already have an account ?
            <v-btn
              class="deep-purple--text ml-n2 text-capitalize"
              text
              rounded
              small
              to="/login"
            >
              Login
            </v-btn>
          </p>
        </div>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import firebase from 'firebase'

export default {
  name: 'SignUp',
  data: () => ({
    loader: false,
    showPassword: false,
    signUpData: {
      email: '',
      password: ''
    },
    errMsg: '',
    passErr: false,
    emailErr: false,
    otherErr: false
  }),
  computed: {
    ...mapState(['signUpError'])
  },
  watch: {
    signUpError (val) {
      this.loader = false
      if (val.code === 'auth/email-already-in-use') {
        this.emailErr = true
        this.errMsg = val.message
      } else {
        this.otherErr = true
        this.errMsg = val.message
      }
    }
  },
  methods: {
    signup () {
      this.otherErr = false
      this.loader = true
      this.$store.dispatch('signup', {
        email: this.signUpData.email,
        password: this.signUpData.password,
        name: this.signUpData.name
      })
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
