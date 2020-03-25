import Vue from 'nativescript-vue'
import App from './components/App'
import { TNSFontIcon, fonticon } from 'nativescript-fonticon'

import store from './store'
  
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

firebase.init({}).then(
  function(inst) {
    console.log("firebase initialized!")
  },
  function(err) {
   console.log("firebase init error: ", err) 
  }
)

new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start()
