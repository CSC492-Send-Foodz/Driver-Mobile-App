<template>
  <ListView
    for="(item, index) in items"
    :key="index"
    separatorColor="transparent"
    @itemTap="selectItem"
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
const isPlayground = true; // change this to show card view on android when building locally

export default {
  components: {
    Order,
  },
  data() {
    return {
      items: [
        {
          heading: "Bulbasaur",
          content: "Bulbasaur can be seen napping in bright sunlight. ",
        },
        {
          heading: "Ivysaur",
          content:
            "To support its weight, Ivysaur’s legs and trunk grow thick and strong. ",
        },
        {
          heading: "Venusaur",
          content: "There is a large flower on Venusaur’s back. ",
        },
        {
          heading: "Charmander",
          content:
            "The flame that burns at the tip of its tail is an indication of its emotions. ",
        },
      ],
    };
  },
  computed: {},
  methods: {
    selectItem() {
      console.log("selected");
      this.$emit("deletedItem", "deleted");
    },
    removeItem(idx) {
      console.log("parent deleting " + idx);
      this.items.splice(idx, 1);
    },
  },
};
</script>
