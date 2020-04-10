<template>
  <CardView class="card" elevation="40" radius="10" ios:shadowRadius="0">
    <StackLayout>
      <Label class="h2" :text="item.heading" />
      <Label class="body" textWrap="true" :text="item.content" />
      <Button @tap="addToDeliverables">Add</Button>
      <Button @tap="removeFromOrders">Remove</Button>
    </StackLayout>
  </CardView>
</template>

<script>
import axios from "axios";

// Initialize firebase
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
    function() {
      console.log("firebase initialized!");
      console.log("connected!");
    },
    function(err) {
      console.log("firebase init error: ", err);
    }
  );

const BASE_URL = "https://us-central1-send-foodz-1a677.cloudfunctions.net/app";

export default {
  created() {
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
      this.authToken = token.token;
    });
  },
  props: {
    index: Number,
    item: Object,
    state: String
  },
  data() {
    authToken: null;
  },
  methods: {
    addToDeliverables() {
      this.state = "accepted";

      const config = {
        headers: { Authorization: `Bearer ${this.authToken}` }
      };

      const payload = {
        id: "4420",
        status: "Inventory picked up"
      };

      axios
        .post(BASE_URL + "/driver/statusUpdate", payload, config)
        .then(result => {
          console.log(JSON.stringify(result));
        })
        .catch(error => {
          console.log(error.response);
        });
    },
    removeFromOrders() {
      this.$emit("removeOrder", this.index);
    }
  }
};
</script>

<style lang="scss" scoped></style>
