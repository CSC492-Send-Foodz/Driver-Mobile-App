import Vue from 'nativescript-vue'
import LoginPage from './components/LoginPage'
import store from './store/index.js'


// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

Vue.registerElement(
  'CardView',
  () => require('@nstudio/nativescript-cardview').CardView
);

new Vue({
  store,
  render: h => h('frame', [h(LoginPage)])
}).$start()
