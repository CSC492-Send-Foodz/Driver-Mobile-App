import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";
import { firestoreAction } from 'vuexfire'

const firebase = require("nativescript-plugin-firebase");

firebase
  .init({
    apiKey: "AIzaSyCMvoPbVC1na4E8L8rtPQrmK-gVuldeTSo",
    authDomain: "send-foodz-1a677.firebaseio.com",
    databaseURL: "https://send-foodz-1a677.firebaseio.com",
    projectId: "send-foodz-1a677",
    storageBucket: "send-foodz-1a677.appspot.com",
    messagingSenderId: "813090925215"
  })
  .then(
    function () {
      console.log("firebase initialized!");
      console.log("connected!");
    },
    function (err) {
      console.log("firebase init error: ", err);
    }
  );

const BASE_URL = "https://us-central1-send-foodz-1a677.cloudfunctions.net/app";

Vue.use(Vuex);
// not using vuex store for now
export default new Vuex.Store({
  state: {
    email: "nelnour90@gmail.com",
    password: "pipchin32!",
    id: "4420",
    authToken: "",
    driverCapacity: 10,
    activeOrders: [],
  },
  getters: {
    getActiveOrders: (state) => {
      return state.activeOrders;
    }
  },
  mutations: {

  },
  actions: {
    bindActiveOrders: firestoreAction(({ bindFirestoreRef }) => {
      bindFirestoreRef('activeOrders', firebase.firestore().collection("Orders")
        .where('status', '==', 'Looking for Driver'))
    }),

    login({ commit }) {
      firebase
        .login({
          type: firebase.LoginType.PASSWORD,
          passwordOptions: {
            email: this.state.email,
            password: this.state.password
          }
        })
        .catch(error => console.log(error));

      firebase.getAuthToken({ forceRefresh: false }).then(token => {
        this.state.authToken = token.token;
      });
    },

    confirmDelivery({ commit }) {
      const config = {
        headers: { Authorization: `Bearer ${this.state.authToken}` }
      };

      const payload = {
        id: this.state.id,
        newStatus: "Inventory picked up"
      };

      axios
        .post(BASE_URL + "/driver/statusUpdate", payload, config)
        .then(result => {
          console.log(JSON.stringify(result));
        })
        .catch(error => {
          console.log("error")
          console.log(error.response);
        });
    }
  }
});
