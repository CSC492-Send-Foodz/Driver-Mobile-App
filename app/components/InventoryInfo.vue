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
    //store.commit("bindActiveOrders");
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
