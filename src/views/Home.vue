<template>
  <div class="home">
    <v-app-bar
      class="hidden-sm-and-down px-10 pt-5"
      flat
      color="fbfdfff7"
      height="70px"
      style="background: rgba(255, 255, 255, 0)"
    >
      <v-toolbar-title
        class="black--text"
      >
        <h1>AT<span class="deep-purple--text">IS</span></h1>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        class="text-capitalize text-h5 mr-2 my-6 deep-purple--text"
        rounded
        text
        to="/login"
      >
        Login
      </v-btn>
      <v-btn
        class="text-capitalize text-h5"
        color="deep-purple"
        to="/signup"
        rounded
        outlined
        dark
      >
        Register
      </v-btn>
    </v-app-bar>
    <v-app-bar
      class="hidden-md-and-up"
      flat
      color="#FFFFFF"
      height="70px"
      style="background: rgba(255, 255, 255, 0.8)"
    >
      <v-toolbar-title>
        <h1>AT<span class="deep-purple--text">IS</span></h1>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer
      fixed
      v-model="drawer"
      right
      dark
      class=""
      width="200"
      height="100%"
    >
      <v-list
        class="pt-15"
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class=""
        >
          <v-list-item
            @click.stop="signUpModal = true"
            to="/login"
          >
            <v-list-item-icon>
              <v-icon>mdi-login</v-icon>
            </v-list-item-icon>
            <v-list-item-title
            >Login</v-list-item-title>
          </v-list-item>

          <v-list-item
            @click.stop="loginModal = true"
            to="/signup"
          >
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title
            >Register</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-card
      class="mx-auto px-10 px-sm-0 mt-16 my-auto"
      flat
      width="600"
    >
      <h2
        class="text-subtitle"
      >
        Welcome to
      </h2>
      <h1
        class="text-h4 text-sm-h2 text-center pt-4"
      >
        Automated Tricycle <span class="deep-purple--text">Identification System</span>
      </h1>
      <v-autocomplete
        class="mt-10 rounded-xl"
        v-model="search"
        :items="searchArray"
        solo-inverted
        append-icon="mdi-magnify"
        placeholder="     Search Tricycle"
        color="deep-purple"
        no-data-text="Rider not found"
      ></v-autocomplete>
    </v-card>

    <v-dialog
      v-if="riderIndex !== ''"
      v-model="dialog"
      width="400"
    >
      <v-card
        class="mx-auto"
      >
        <v-card-title>
          {{ riders[this.riderIndex].data.name }}
        </v-card-title>
        <v-card-text>
          <p>Plate Number: {{ riders[this.riderIndex].data.plateNumber }}</p>
          <p>Drivers License ID: {{ riders[this.riderIndex].data.driversLicenseID }}</p>
          <p>Rider's Phone Number: {{ riders[this.riderIndex].data.phoneNumber }}</p>
          <p>Residential Address: {{ riders[this.riderIndex].data.resAddress }}</p>
          <p>Permanent Address: {{ riders[this.riderIndex].data.perAddress }}</p>
          <p>Date of Birth: {{ riders[this.riderIndex].data.dateOfBirth }}</p>
          <p>State of Origin: {{ riders[this.riderIndex].data.stateOfOrigin }}</p>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-footer
      class="footer"
      dark
      padless
      color="deep-purple"
    >
      <v-container
        class="text-center"
      >
        Assignment By: Amoli and Mafemilola
      </v-container>
    </v-footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Home',
  data: () => ({
    dialog: false,
    drawer: false,
    search: '',
    searchArray: [],
    riderIndex: ''
  }),
  created () {
    this.getRiders()
  },
  /* mounted () {
    this.sortDriversArray()
  }, */
  computed: {
    ...mapState(['riders'])
  },
  watch: {
    riders () {
      this.sortDriversArray()
    },
    search () {
      this.displaySearch(this.search)
    }
  },
  methods: {
    getRiders () {
      this.$store.dispatch('getRiders')
    },
    loginPop () {
      this.$emit('loginPop')
    },
    signUpPop () {
      this.$emit('signUpPop')
    },
    sortDriversArray () {
      this.riders.forEach((x, index) => {
        this.searchArray.push(`${index} ${x.data.name}`)
        this.searchArray.push(`${index} ${x.data.plateNumber}`)
        this.searchArray.push(`${index} ${x.data.driversLicenseID}`)
      })
    },
    displaySearch (search) {
      const select = search.split(' ')
      this.riderIndex = select[0]
      console.log(this.riderIndex)
      this.dialog = true
    }
  }
}
</script>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
