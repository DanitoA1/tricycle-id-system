<template>
  <div>
    <v-card
      class="mx-auto mt-10"
      width="500"
    >
      <v-card-title>
        Add New Rider
      </v-card-title>
      <v-card-subtitle>
        Fill in the form below with the correct details of the Rider
      </v-card-subtitle>
      <div
        class="px-4 mt-3"
      >
        <v-text-field
          class=""
          v-model="riderDetails[0].name"
          outlined
          label="Name of Rider"
          color="deep-purple"
          shaped
        ></v-text-field>
        <v-text-field
          class=""
          v-model="riderDetails[0].phoneNumber"
          outlined
          label="Phone Number"
          color="deep-purple"
          shaped
        ></v-text-field>
        <v-text-field
          class=""
          v-model="riderDetails[0].plateNumber"
          outlined
          label="Plate Number"
          color="deep-purple"
          shaped
        ></v-text-field>
        <v-text-field
          class=""
          v-model="riderDetails[0].driversLicenseID"
          outlined
          label="Drivers License ID"
          color="deep-purple"
          shaped
        ></v-text-field>
        <v-text-field
          class=""
          v-model="riderDetails[0].resAddress"
          outlined
          label="Residential Address"
          color="deep-purple"
          shaped
        ></v-text-field>
        <v-text-field
          class=""
          v-model="riderDetails[0].perAddress"
          outlined
          label="Permanent Home Address"
          color="deep-purple"
          shaped
        ></v-text-field>
        <v-select
          class=""
          v-model="riderDetails[0].stateOfOrigin"
          outlined
          label="Select State of Origin"
          color="deep-purple"
          shaped
          :items="states"
        ></v-select>
        <v-text-field
          class=""
          v-model="riderDetails[0].dateOfBirth"
          outlined
          label="DOB: dd/mm/yyyy"
          color="deep-purple"
          shaped
        ></v-text-field>
      </div>
      <v-card-actions>
        <v-btn
          class="mx-auto mb-4 rounded-xl"
          color="red"
          dark
          @click="updateRider()"
        >
          Update Rider
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
/* eslint-disable */
import { ridersCollection } from '@/firebase'
import { mapState } from 'vuex'


export default {
  name: 'editRider',
  data: () => ({
    states: [
      'Abia',
      'Adamawa',
      'Akwa Ibom',
      'Anambra',
      'Bauchi',
      'Bayelsa',
      'Benue',
      'Borno',
      'Cross River',
      'Delta',
      'Ebonyi',
      'Edo',
      'Ekiti',
      'Enugu',
      'FCT - Abuja',
      'Gombe',
      'Imo',
      'Jigawa',
      'Kaduna',
      'Kano',
      'Katsina',
      'Kebbi',
      'Kogi',
      'Kwara',
      'Lagos',
      'Nasarawa',
      'Niger',
      'Ogun',
      'Ondo',
      'Osun',
      'Oyo',
      'Plateau',
      'Rivers',
      'Sokoto',
      'Taraba',
      'Yobe',
      'Zamfara'
    ],
    id: '',
    riderIndex: ''
  }),
  computed: {
    ...mapState(['riders']),
    riderDetails () {
      this.riderIndex = this.riders.findIndex((x) => x.id === this.id)
      const riderArray = []
      riderArray.push(JSON.parse(JSON.stringify(this.riders[this.riderIndex].data)))
      return riderArray
    }
  },
  created () {
    this.id = this.$route.params.id
  },
  methods: {
    async updateRider () {
      await ridersCollection.doc(this.id).set({
        createdOn: new Date(),
        data: this.riderDetails[0]
      })
      this.$router.push({ name: 'Overview' })
    }
  }
}
</script>
