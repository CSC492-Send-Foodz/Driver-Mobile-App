import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
// not using vuex store for now
export default new Vuex.Store({
  state: {
    //hard coded but assume it was inputted
    driverCapacity: 10,

    activeOrders: [],
  },
  mutations: {
    
  },
  actions: {

  }
});
