<template>
  <Page class="page" @loaded="appLoaded" actionBarHidden="true">
    <AbsoluteLayout ref="rootLayout">
      <StackLayout
        left="0"
        top="0"
        height="100%"
        width="100%"
        v-if="display === 'H'"
      >
        <Label text="home" />
      </StackLayout>

      <StackLayout
        left="0"
        top="0"
        height="100%"
        width="100%"
        v-if="display === 'M'"
      >
        <InventoryInfo />
      </StackLayout>

      <StackLayout
        left="0"
        top="0"
        height="100%"
        width="100%"
        class="backdrop"
        :class="classBackdrop"
      />

      <AbsoluteLayout ref="fabItemPosition" marginTop="87%" marginLeft="80%">
        <GridLayout ref="fabItemContainer" left="8" top="8">
          <FabItem
            row="1"
            :class="classItem1"
            color="#E94E77"
            title="M"
            @routeTo="route"
          />
        </GridLayout>
        <FabButton @onButtonTap="onButtonTap" :isActive="isActive" />
      </AbsoluteLayout>
    </AbsoluteLayout>
  </Page>
</template>

<script scoped>
import InventoryInfo from "../components/InventoryInfo";
import FabButton from "../templates/FabButton";
import FabItem from "../templates/FabItem";
import store from "../store/index"

const app = require("tns-core-modules/application");
const platform = require("tns-core-modules/platform");


export default {
  created() {
    store.commit("bindActiveOrders");
  },
  data() {
    return {
      isActive: false,
      display: "M"
    };
  },
  computed: {
    classItem1() {
      return this.isActive ? "raiseItem1" : "downItem1";
    },
    classItem2() {
      return this.isActive ? "raiseItem2" : "downItem2";
    },
    classItem3() {
      return this.isActive ? "raiseItem3" : "downItem3";
    },
    classBackdrop() {
      return this.isActive ? "backdrop-visible" : "backdrop-invisible";
    }
  },
  methods: {
    appLoaded(args) {
      let fabItemContainer = this.$refs.fabItemContainer.nativeView;
      let fabItemPosition = this.$refs.fabItemPosition.nativeView;
      let rootLayout = this.$refs.rootLayout.nativeView;

      // Needed to avoid masking child components on Android
      if (app.android && platform.device.sdkVersion >= "21") {
        fabItemContainer.android.setClipChildren(false);
        fabItemPosition.android.setClipChildren(false);
        rootLayout.android.setClipChildren(false);
      }
    },
    route(page) {
      this.display = page
    },
    onButtonTap(args) {
      this.isActive = !this.isActive;
    }
  },
  components: {
    FabButton,
    FabItem,
    InventoryInfo
  }
};

</script>

<style scoped>

.backdrop {
  background-color: rgba(29, 30, 35, 0.9);
  opacity: 0;
}

.backdrop-visible {
  animation-name: activateBackdrop;
  animation-duration: 0.25;
  animation-fill-mode: forwards;
}

.backdrop-invisible {
  animation-name: activateBackdrop;
  animation-duration: 0.25;
  animation-fill-mode: forwards;
  animation-direction: reverse;
}

.raiseItem1 {
  opacity: 1;
  animation-name: raiseItem1;
  animation-duration: 0.25;
  animation-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
  animation-fill-mode: forwards;
}

.raiseItem2 {
  opacity: 1;
  animation-name: raiseItem2;
  animation-duration: 0.25;
  animation-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
  animation-fill-mode: forwards;
}

.raiseItem3 {
  opacity: 1;
  animation-name: raiseItem3;
  animation-duration: 0.25;
  animation-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
  animation-fill-mode: forwards;
}

.downItem1 {
  animation-name: raiseItem1;
  animation-duration: 0.2;
  animation-timing-function: cubic-bezier(0.895, 0.03, 0.685, 0.22);
  animation-fill-mode: forwards;
  animation-direction: reverse;
}

.downItem2 {
  animation-name: raiseItem2;
  animation-duration: 0.2;
  animation-timing-function: cubic-bezier(0.895, 0.03, 0.685, 0.22);
  animation-fill-mode: forwards;
  animation-direction: reverse;
}

.downItem3 {
  animation-name: raiseItem3;
  animation-duration: 0.2;
  animation-timing-function: cubic-bezier(0.895, 0.03, 0.685, 0.22);
  animation-fill-mode: forwards;
  animation-direction: reverse;
}

@keyframes activateBackdrop {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes raiseItem1 {
  from {
    opacity: 1;
    transform: translate(0, 0);
  }

  to {
    opacity: 1;
    transform: translate(0, -64);
  }
}

@keyframes raiseItem2 {
  from {
    opacity: 1;
    transform: translate(0, 0);
  }

  to {
    opacity: 1;
    transform: translate(0, -128);
  }
}

@keyframes raiseItem3 {
  from {
    opacity: 1;
    transform: translate(0, 0);
  }

  to {
    opacity: 1;
    transform: translate(0, -192);
  }
}
</style>
