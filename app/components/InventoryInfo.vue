<template>
  <ListView
    for="(item, index) in items"
    :key="index"
    separatorColor="transparent"
  >
    <v-template>
      <Order
        :index="index"
        :item="item"
        :state="show"
        @removeOrder="removeItem"
      />
    </v-template>
  </ListView>
</template>

<script>
import firebase from "nativescript-plugin-firebase";
import Order from "./Order";
import store from '../store/index.js';
const isPlayground = true; // change this to show card view on android when building locally

export default {
  created() {
    store.dispatch("login");
    store.commit("bindActiveOrders");
  },
  mounted() {
    this.items = this.getActiveOrders();
  },
  components: {
    Order
  },
  data() {
    return {
      items: []
    };
  },
  methods: {
    getActiveOrders() {
      return store.getters.getActiveOrders;
    },
    removeItem(idx) {
      this.items.splice(idx, 1);
    }
  }
};
</script>
