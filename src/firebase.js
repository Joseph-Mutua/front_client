import * as firebase from 'firebase'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAE6oBnBhG5Kons1Uj6XSkfAtX9JEnP1Mc",
  authDomain: "thriftshop-5f417.firebaseapp.com",
  projectId: "thriftshop-5f417",
  storageBucket: "thriftshop-5f417.appspot.com",
  messagingSenderId: "345153006632",
  appId: "1:345153006632:web:0c593c8056e0611b12591d",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();