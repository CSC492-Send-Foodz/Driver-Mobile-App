import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { LocalNotifications } from 'nativescript-local-notifications'

const firebase = require("nativescript-plugin-firebase");
var dialogs = require("tns-core-modules/ui/dialogs")
var curToken;

LocalNotifications.hasPermission();

LocalNotifications.addOnMessageReceivedCallback(notif => {
  console.log(notif)
  dialogs.alert({
    title: "Order Pick-up",
    message: "yayyy!!",
    okButtonText: "Yay!"
  });
})

firebase
  .init({
    showNotifications: true,
    showNotificationsWhenInForeground: true,
    onPushTokenReceivedCallback: token => {
      curToken = token;
      console.log(curToken);
    },
    onMessageReceivedCallback: (message) => {
      dialogs.alert({
        title: "Order pick-up",
        message: message,
        okButtonText: "Yay!"
      });
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
          console.log(orderData);
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
        console.log(this.state.authToken)
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
    },
    postAccountUpdate(context, payload) {
      console.log(payload)
      const config = {
        headers: { Authorization: `Bearer ${this.state.authToken}` }
      };
      const data = {
        name: payload[0],
        capacity: payload[1],
        id: this.state.id
      };

      console.log(data)

      axios.post(BASE_URL + "/driver/updateUserAccount", data, config)
        .catch(error => {
          console.log("error!error!error!")
          console.log(error.response)
        });
    }
  }
});
