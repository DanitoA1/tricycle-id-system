<template>
  <div>
    <v-toolbar
      color="deep-purple"
      dark
    >
      <v-app-bar-nav-icon
        @click="drawer = true"
        class="d-md-none"
      ></v-app-bar-nav-icon>

      <v-toolbar-title
        class="mx-auto"
      >
        ATIS
      </v-toolbar-title>

    </v-toolbar>
    <v-navigation-drawer
      absolute
      v-model="drawer"
      color="#3D2B3D"
      dark
      fixed
      :mini-variant="$vuetify.breakpoint.mdAndUp"
      :expand-on-hover="$vuetify.breakpoint.mdAndUp"
      :permanent="$vuetify.breakpoint.mdAndUp"
      class="mt-16"
    >
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img
              src="/img/admin-avatar.jpg"
              alt="A"
            >
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Admin</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list
        dense
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.link !== '/'? item.link: ''"
          @click="item.link === '/'? logOut(): ''"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <router-view></router-view>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Admin',
  data: () => ({
    drawer: false,
    items: [
      { title: 'Overview', icon: 'mdi-view-dashboard', link: '/admin/overview' },
      { title: 'Add Riders', icon: 'mdi-animation-outline', link: '/admin/add-riders' },
      { title: 'Logout', icon: 'mdi-logout', link: '/' }
    ]
  }),
  methods: {
    logOut () {
      firebase.auth().signOut()
        .then(() => {
          // Sign-out successful.
          this.$router.push('/login')
        })
        .catch((error) => {
          // An error happened.
          console.log(error)
        })
    }
  }
}
</script>
