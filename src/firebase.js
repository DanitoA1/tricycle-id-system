import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// firebase init
const firebaseConfig = {
  apiKey: 'AIzaSyAVXUlRV65fgOPMcXYbK9OPbbF-1zTSEnc',
  authDomain: 'tricycle-id-system.firebaseapp.com',
  projectId: 'tricycle-id-system',
  storageBucket: 'tricycle-id-system.appspot.com',
  messagingSenderId: '197921775941',
  appId: '1:197921775941:web:a36f4a0471e36e342e5e2c'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()
const ridersCollection = db.collection('riders')

export {
  db,
  auth,
  ridersCollection
}
