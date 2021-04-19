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
          v-model="riderDetails.name"
          outlined
          label="Name of Rider"
          color="deep-purple"
          shaped
        ></v-text-field>
        <v-text-field
          class=""
          v-model="riderDetails.phoneNumber"
          outlined
          label="Phone Number"
          color="deep-purple"
          shaped
        ></v-text-field>
        <v-text-field
          class=""
          v-model="riderDetails.plateNumber"
          outlined
          label="Plate Number"
          color="deep-purple"
          shaped
        ></v-text-field>
        <v-text-field
          class=""
          v-model="riderDetails.driversLicenseID"
          outlined
          label="Drivers License ID"
          color="deep-purple"
          shaped
        ></v-text-field>
        <v-text-field
          class=""
          v-model="riderDetails.resAddress"
          outlined
          label="Residential Address"
          color="deep-purple"
          shaped
        ></v-text-field>
        <v-text-field
          class=""
          v-model="riderDetails.perAddress"
          outlined
          label="Permanent Home Address"
          color="deep-purple"
          shaped
        ></v-text-field>
        <v-select
          class=""
          v-model="riderDetails.stateOfOrigin"
          outlined
          label="Select State of Origin"
          color="deep-purple"
          shaped
          :items="states"
        ></v-select>
        <v-text-field
          class=""
          v-model="riderDetails.dateOfBirth"
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
          @click="addRider()"
        >
          Save Rider
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
// import firebase from 'firebase'

export default {
  name: 'addRider',
  data: () => ({
    riderDetails: {
      name: '',
      plateNumber: '',
      driversLicenseID: '',
      resAddress: '',
      perAddress: '',
      stateOfOrigin: '',
      dateOfBirth: '',
      phoneNumber: ''
    },
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
    Calculations: [],
    results: []
  }),
  methods: {
    addRider () {
      this.$store.dispatch('addRider', this.riderDetails)
    }
  }
}
</script>
