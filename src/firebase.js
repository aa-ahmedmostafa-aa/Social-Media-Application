import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyD9hU_KzEW2JDS2Xi6GtmSuJlVmszf93tE",
  authDomain: "reactsocialmedia-3624c.firebaseapp.com",
  projectId: "reactsocialmedia-3624c",
  storageBucket: "reactsocialmedia-3624c.appspot.com",
  messagingSenderId: "977372345897",
  appId: "1:977372345897:web:cb161059657960ae1a8e38",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();
export { db, auth, storage, provider };
