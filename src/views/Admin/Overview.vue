<template>
  <v-container
    class="mx-auto"
  >
    <v-card>
      <v-card-title>
        Registered Tricycles
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="riders"
        :search="search"
        :loading="riders.length == 0"
      >
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn
            color="primary"
            @click="initialize"
          >
            Reset
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { ridersCollection } from '@/firebase'
import { mapState } from 'vuex'

export default {
  name: 'Overview',
  data: () => ({
    dialog: false,
    dialogDelete: false,
    search: '',
    headers: [
      {
        text: 'Name Rider',
        align: 'start',
        sortable: false,
        value: 'data.name'
      },
      { text: 'Plate Number', value: 'data.plateNumber' },
      { text: 'Drivers License ID', value: 'data.driversLicenseID' },
      { text: 'Phone Number', value: 'data.phoneNumber' },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    editedIndex: '',
    results: []
  }),
  computed: {
    ...mapState(['riders'])
  },
  created () {
    this.getRiders()
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    }
  },
  methods: {
    getRiders () {
      this.$store.dispatch('getRiders')
    },
    editItem (item) {
      this.editedIndex = this.riders.indexOf(item)
      const riderID = this.riders[this.editedIndex].id
      this.$router.push({ name: 'editRiders', params: { id: riderID } })
    },

    deleteItem (item) {
      this.editedIndex = this.riders.indexOf(item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      const riderID = this.riders[this.editedIndex].id
      this.riderDelete(riderID)
      this.closeDelete()
    },
    closeDelete () {
      this.dialogDelete = false
    },
    async riderDelete (id) {
      await ridersCollection.doc(id).delete()
    }
  }
}
</script>
