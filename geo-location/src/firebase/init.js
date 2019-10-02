import firebase from 'firebase'
import firestore from 'firebase/firestore'

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDguNQ8_xPUqfMN542Z_udVE2xdSw_yJoA",
    authDomain: "geo-location-dbca9.firebaseapp.com",
    databaseURL: "https://geo-location-dbca9.firebaseio.com",
    projectId: "geo-location-dbca9",
    storageBucket: "",
    messagingSenderId: "128676705407",
    appId: "1:128676705407:web:f64af555c8aab175373b4a"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  export default firebaseApp.firestore()