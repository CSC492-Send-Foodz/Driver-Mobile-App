<template>
  <Page actionBarHidden="true">
    <BottomNavigation>
      <TabStrip>
        <TabStripItem>
          <Label text="Home"></Label>
        </TabStripItem>
        <TabStripItem>
          <Label text="Active Orders"></Label>
        </TabStripItem>
      </TabStrip>

      <TabContentItem>
        <StackLayout>
          <Label text="home" class="h1"></Label>
        </StackLayout>
      </TabContentItem>

      <TabContentItem>
        <InventoryInfo @deletedItem="logDeletion" />
      </TabContentItem>
    </BottomNavigation>
  </Page>
</template>

<script>
import firebase from "nativescript-plugin-firebase";
import InventoryInfo from "./InventoryInfo";

export default {
  components: {
    InventoryInfo
  },
  data() {
    return {};
  },
  methods: {
    logDeletion(mssg) {
      console.log(mssg);
      console.log("test logging");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@nativescript/theme/scss/variables/blue";

.add-button {
  height: 30;
  background-color: rgb(51, 51, 206);
  color: white;
  border-radius: 5;
  font-size: 20;
  font-weight: 600;
}

ActionBar {
  background-color: #53ba82;
  color: #ffffff;
}

.message {
  vertical-align: center;
  text-align: center;
  font-size: 20;
  color: #333333;
}

.card {
  background-color: #fff;
  color: #4d4d4d;
  margin: 15;
}

.card-layout {
  padding: 20;
}
</style>
