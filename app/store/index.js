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
    name: "",
    activeOrders: [],
  },
  getters: {
    getActiveOrders: (state) => {
      return state.activeOrders;
    },

    getAuthToken: (state) => {
      return state.authToken;
    }
  },

  mutations: {
    bindActiveOrders({ commit }) {
      this.state.activeOrders = [];
      db.collection("Orders").where("status", "==", "Looking For Driver").get().then(orders => {
        orders.forEach(order => {
          let orderData = order.data();
          if (orderData.quantity <= this.state.driverCapacity) {
            console.log(orderData)
            this.state.activeOrders.push(order.data());
          }
        })
      }
      )
    },
  },

  actions: {
    login({ commit }) {
      //console.log("this is inside login", payload);
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
  
          console.log(authToken)
        });

      //console.log("log in successful authorization token set");
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

    postAccountUpdate({ commit }) {
      const config = {
        headers: { Authorization: `Bearer ${this.state.authToken}` }
      };
      //data passed correctly
      //console.log(this.state.name, this.state.capacity, this.state.id);
      console.log(config);

      const data = {
        name: this.state.name,
        capacity: this.state.capacity,
        id: this.state.id,
        currentLocation: ''
      };

      axios.post(BASE_URL + "/driver/updateUserAccount", data, config)
        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          console.log(error.response)
        });

      //console.log("postAccountUpdate WORKED!!");
    },
    /**     
          signin(context, payload) {
            firebase.auth().setPersistence(firebase.default.auth.Auth.Persistence.SESSION).then(async function () {
              return firebase.auth().signInWithEmailAndPassword(payload[0], payload[1])
                .catch(error => {
                  if (error.code === "auth/wrong-password") {
                    return "Login Failed";
                  } else {
                    return "Something went wrong. Try again later";
                  }
                });
            });
          },
     /**     
          signup(email, password) {
            return db.auth().createUserWithEmailAndPassword(email, password)
              .catch(error => {
                return error.message;
              });
          }
    **/
  }
});
