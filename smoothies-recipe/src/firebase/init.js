import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBJTd0sYJ2JGaJTL5_QKeftUJyum3MRris",
    authDomain: "smoothies-recipe.firebaseapp.com",
    databaseURL: "https://smoothies-recipe.firebaseio.com",
    projectId: "smoothies-recipe",
    storageBucket: "smoothies-recipe.appspot.com",
    messagingSenderId: "214103877096",
    appId: "1:214103877096:web:cac3b7ed8d9fa058"
  };
  // Initialize Firebase
  const firebaseApp=firebase.initializeApp(firebaseConfig);

  export default firebaseApp.firestore()