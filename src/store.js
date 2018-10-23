import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";

import notifyReducer from "./reducers/notify-reducer";
import settingsReducer from "./reducers/settings-reducer";

const firebaseConfig = {
  apiKey: "AIzaSyDR5uhkFiaBRtIQlr-FkVFAwVih_MpMCjY",
  authDomain: "react-client-panel-329e6.firebaseapp.com",
  databaseURL: "https://react-client-panel-329e6.firebaseio.com",
  projectId: "react-client-panel-329e6",
  storageBucket: "react-client-panel-329e6.appspot.com",
  messagingSenderId: "841751591051"
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

// Initialize other services on firebase instance
const firestore = firebase.firestore(); // <- needed if using firestore
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
  notify: notifyReducer,
  settings: settingsReducer
});

// check local storage

if (localStorage.getItem("settings") == null) {
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false
  };
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
