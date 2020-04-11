<template>
  <StackLayout class="fab-item" :backgroundColor="color">
    <Button
      :text="title"
      horizontalAlignment="center"
      :backgroundColor="color"
      @tap="onRoute"
    />
  </StackLayout>
</template>

<script>
export default {
  props: {
    title: String,
    color: String
  },
  methods: {
    onRoute() {
      console.log("routing");
     this.$emit("routeTo", this.title);
    }
  }
};
</script>

<style scoped>
.fab-item {
  width: 40;
  height: 40;
  border-radius: 50%;
  color: #fff;
  font-weight: bold;
  vertical-align: center;
}

StackLayout button {
  
  width: 40;
  height: 40;
  border-radius: 50%;
  color: #fff;
  font-weight: bold;
  vertical-align: center;
}
</style>
