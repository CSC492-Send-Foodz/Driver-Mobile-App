import Vue from 'nativescript-vue'
import App from './components/App'
import { TNSFontIcon, fonticon } from 'nativescript-fonticon'

import store from "./store/index.js"
  
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

// Bind fonticons
TNSFontIcon.debug = true;
TNSFontIcon.paths = {
  'fa': './assets/all.css'
};
TNSFontIcon.loadCss();

Vue.filter('fonticon', fonticon);

// Initialize firebase
const firebase = require('nativescript-plugin-firebase')

firebase.init({}).then(
  function() {
    console.log("firebase initialized!");
  },
  function(err) {
   console.log("firebase init error: ", err) 
  }
)

/**
const driverCollection = firebase.firestore().collection("Drivers");
const query = driverCollection
    .where("capacity", ">", "10")

    query
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
      });
    });
**/
Vue.registerElement(
  'CardView',
  () => require('@nstudio/nativescript-cardview').CardView
);

new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start()
