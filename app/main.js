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
var firebase = require('nativescript-plugin-firebase')

firebase.init({projectId: 'send-foodz-1a677'}).then(
  function(inst) {
    console.log("firebase initialized!");
    firebase.firestore
                .collection("Orders")
                .where("quantity", ">=", "6").where("quantity", "<=", "15")
                .get()
                .then(snapshot => {
                    snapshot.forEach(document => {
                        console.log(document.data());
                    });
                });
  },
  function(err) {
   console.log("firebase init error: ", err) 
  }
)

Vue.registerElement(
  'CardView',
  () => require('@nstudio/nativescript-cardview').CardView
);

new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start()
