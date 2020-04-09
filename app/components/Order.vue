<template>
  <CardView class="card" elevation="40" radius="10" ios:shadowRadius="0">
    <StackLayout>
      <Label class="h2" :text="item.heading" />
      <Label class="body" textWrap="true" :text="item.content" />
      <Button tap="addToDeliverables">Add</Button>
      <Button tap="removeFromOrders">Remove</Button>
    </StackLayout>
  </CardView>
</template>

<script>
import axios from "axios";
const BASE_URL = "https://us-central1-send-foodz-1a677.cloudfunctions.net/app";

export default {
  props: {
    index: Number,
    item: Object,
    state: String,
  },
  data() {},
  methods: {
    addToDeliverables() {
      this.state = "accepted";

      axios
        .post(BASE_URL + "/driver/statusUpdate", {
          driverId: "4420",
          driverStatus: "Inventory picked up",
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    removeFromOrders() {
      this.$emit("removeOrder", this.index);
    },
  },
};
</script>

<style lang="scss" scoped></style>
