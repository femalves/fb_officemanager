import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { createStore, combineReducers, compose } from "redux";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";

import notifyReducer from "./reducers/notifyReducer";
import settingsReducer from "./reducers/settingsReducer";

const fbConfig = {
  apiKey: "AIzaSyAQ5v_ZhdJ8CMv2DvQ7o_TJkKV7SFWw1A0",
  authDomain: "reactofficemanager.firebaseapp.com",
  databaseURL: "https://reactofficemanager.firebaseio.com",
  projectId: "reactofficemanager",
  storageBucket: "reactofficemanager.appspot.com",
  messagingSenderId: "816659856676",
  appId: "1:816659856676:web:daa3d832c09dcf062b07b1",
  measurementId: "G-W63CQMZLPQ"
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true
};

// Init firebase instance
firebase.initializeApp(fbConfig);

// Initialize other services on firebase instance
const firestore = firebase.firestore();
const settings = {};
firestore.settings(settings);
//Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer,
  settings: settingsReducer
});

// Check for settings in local storage
if (localStorage.getItem("settings") === null) {
  //Default settings
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false
  };

  // Set to localStorage
  localStorage.setItem("settings", JSON.stringify(defaultSettings));
}
// Create store with reducers and initial state
const initialState = { settings: JSON.parse(localStorage.getItem("settings")) };
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
export default store;
