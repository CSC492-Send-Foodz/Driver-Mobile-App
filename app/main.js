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

Vue.registerElement(
  'CardView',
  () => require('@nstudio/nativescript-cardview').CardView
);

new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start()
