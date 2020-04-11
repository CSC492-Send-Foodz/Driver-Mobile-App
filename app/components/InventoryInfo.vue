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
import store from "../store/index"
import Order from "./Order";

export default {
  created() {
    store.commit("bindActiveOrders");
    console.log("created")
  },

  mounted() {
    this.items = this.getActiveOrders();
    console.log("getting orders")
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
      console.log("getting ordes")
      return store.getters.getActiveOrders;
    },

    removeItem(idx) {
      this.items.splice(idx, 1);
    }
  }
};
</script>
