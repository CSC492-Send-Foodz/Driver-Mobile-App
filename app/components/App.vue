<template>
   <Page actionBarHidden="true">
        <TabView android:tabBackgroundColor="#fbc59c"
                 android:tabTextColor="#c4ffdf"
                 android:selectedTabTextColor="#ffffff"
                 androidSelectedTabHighlightColor="#ffffff">
            <TabViewItem title="Home">
                <GridLayout columns="*" rows="*">
                    <Label class="message" text="Hello, driver!" col="0" row="0"/>
                </GridLayout>
            </TabViewItem>
            <TabViewItem title="Active Orders">
                <GridLayout columns="*" rows="*">
                    <Label class="message" text="See list of orders as cards here" col="0" row="0"/>
                </GridLayout>
            </TabViewItem>
            <TabViewItem title="Directions">
                <GridLayout columns="*" rows="*">
                    <Label class="message" text="Google map" col="0" row="0"/>
                </GridLayout>
            </TabViewItem>
        </TabView>
    </Page>
</template>

<script >
  export default {
    data() {
      return {
        msg: 'Hello World!'
      }
    }
  }
</script>

<style scoped>
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
</style>
