import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

const firebase = require("nativescript-plugin-firebase");
var curToken;

firebase
  .init({
    showNotifications: true,
    showNotificationsWhenInForeground: true,
    onPushTokenReceivedCallback: (token) => {
      console.log('Push Token :', { token });
      curToken = token;
    },
    onMessageReceivedCallback: (message) => {
      console.log('Message received :', { message });
    },
    apiKey: "AIzaSyCMvoPbVC1na4E8L8rtPQrmK-gVuldeTSo",
    authDomain: "send-foodz-1a677.firebaseio.com",
    databaseURL: "https://send-foodz-1a677.firebaseio.com",
    projectId: "send-foodz-1a677",
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
const db = firebase.firestore;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    email: "nelnour90@gmail.com",
    password: "pipchin32!",
    id: "4420",
    authToken: "",
    driverCapacity: "10",
    activeOrders: [],
  },
  getters: {
    getActiveOrders: (state) => {
      return state.activeOrders;
    }
  },
  mutations: {
    bindActiveOrders({ commit }) {
      this.state.activeOrders = [];
      db.collection("Orders").where("status", "==", "Looking For Driver").get().then(orders => {
        orders.forEach(order => {
          let orderData = order.data();
          if (orderData.quantity <= this.state.driverCapacity) {
            this.state.activeOrders.push(order.data());
          }
        })
      }
      )
    },
  },
  actions: {
    login({ commit }) {
      firebase
        .login({
          type: firebase.LoginType.PASSWORD,
          passwordOptions: {
            email: "nelnour90@gmail.com",
            password: "pipchin32!"
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
        status: "Unavailable",
        token: curToken
      };

      axios
        .post(BASE_URL + "/driver/statusUpdate", payload, config)
        .catch(error => {
          console.log(error.response);
        });
    }
  }
});
