import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBer-mhUkLNjEAlw1X6HeXw1vt1on3bgPA",
  authDomain: "react-native-f-52210.firebaseapp.com",
  projectId: "react-native-f-52210",
  storageBucket: "react-native-f-52210.appspot.com",
  messagingSenderId: "567942682672",
  appId: "1:567942682672:web:373b3ef99c363d3dc1b5f5",
  measurementId: "G-5LKE82G71L"
};

if (!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}

export { firebase };