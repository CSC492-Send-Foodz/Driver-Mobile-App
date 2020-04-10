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
import { mapActions } from "vuex";
import store from '../store/index';

export default {
  props: {
    index: Number,
    item: Object,
    state: String
  },
  data() {},
  methods: {
    ...mapActions(["confirmDelivery"]),
    addToDeliverables() {
      this.state = "accepted";
      store.dispatch("confirmDelivery");
      this.$emit("confirmOrder", this.index);
    },
    removeFromOrders() {
      this.$emit("removeOrder", this.index);
    }
  }
};
</script>

<style lang="scss" scoped></style>
