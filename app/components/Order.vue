<template>
  <CardView class="card" elevation="40" radius="10" ios:shadowRadius="0">
    <StackLayout>
      <Label class="h4" textWrap="true">
        Grocery Store: {{ item.groceryStoreId }}
      </Label>
      <Label class="h4" textWrap="true">
        Food Bank: {{ item.foodBankId }}
      </Label>
      <Label class="h4" textWrap="true"> Qty: {{ item.quantity }}</Label>
      <Button @tap="addToDeliverables">Add</Button>
      <Button @tap="removeFromOrders">Remove</Button>
    </StackLayout>
  </CardView>
</template>

<script>
import store from '../store/index.js';

export default {
  props: {
    index: Number,
    item: Object,
    state: String
  },
  data() {},
  methods: {
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

