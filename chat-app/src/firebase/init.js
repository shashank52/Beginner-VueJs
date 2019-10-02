import firebase from 'firebase'
import firestore from 'firebase/firestore'

 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyDlcPH4ae43JCGhnvTjvyqikR2eq0X1Eco",
    authDomain: "chat-app-8c2fc.firebaseapp.com",
    databaseURL: "https://chat-app-8c2fc.firebaseio.com",
    projectId: "chat-app-8c2fc",
    storageBucket: "chat-app-8c2fc.appspot.com",
    messagingSenderId: "329400811875",
    appId: "1:329400811875:web:e064517ac0e7dec0"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  export default firebaseApp.firestore()