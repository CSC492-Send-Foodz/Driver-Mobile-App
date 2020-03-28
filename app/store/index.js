import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activeOrders: [],
  },
  mutations: {

  },
  actions: {
		//bindOrders: firestoreAction(({ bindFirestoreRef}, quantity) => {
		//	bindFirestoreRef('inventoryItems',
    //  firebase.firestore().collection("Orders").where("quantity", ">=", quantity).where("quantity", "<=", quantity))
		//}),
  }
});
