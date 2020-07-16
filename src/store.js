import { createStore, combineReducers, compose } from "redux"
import firebase from "firebase"
import "firebase/firestore"
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase"
import { reduxFirestore, firestoreReducer } from "redux-firestore"

//Reducers
import notifyReducer from "./reducers/notifyReducer"
import settingsReducer from "./reducers/settingsReducer"

const firebaseConfig = {
  apiKey: "AIzaSyA3SXp9LKCzVZ-Z0pXZvQvo7yAloGhlga8",
  authDomain: "reactclientpanel-17c91.firebaseapp.com",
  databaseURL: "https://reactclientpanel-17c91.firebaseio.com",
  projectId: "reactclientpanel-17c91",
  storageBucket: "reactclientpanel-17c91.appspot.com",
  messagingSenderId: "433034278511",
  appId: "1:433034278511:web:ec3c1e3c3030dadc1aff9a",
  measurementId: "G-VSCT6JH6PT"
}

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true
}

// Init firebase instance
firebase.initializeApp(firebaseConfig)
// Init firestore
// const firestore = firebase.firestore()
// const settings = { timestampsInSnapshots: true }
// firestore.settings(settings)

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)(createStore)

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer,
  settings: settingsReducer
})

// Check for settings in localStorage
if (localStorage.getItem("settings") == null) {
  // Default settings
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false
  }

  // Set to localStorage
  localStorage.setItem("settings", JSON.stringify(defaultSettings))
}

// Create initial state
const initialState = { settings: JSON.parse(localStorage.getItem("settings")) }

// Create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState
  // compose(
  //   reactReduxFirebase(firebase),
  //   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  // )
)

export default store
