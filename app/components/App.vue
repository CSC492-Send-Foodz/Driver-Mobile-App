<template>
   <Page actionBarHidden="true">
        <TabView android:tabBackgroundColor="#fbc59c"
                 android:tabTextColor="#c4ffdf"
                 android:selectedTabTextColor="#ffffff"
                 androidSelectedTabHighlightColor="#ffffff">
            <TabViewItem title="Home">
                <!--
                <GridLayout columns="*" rows="*">
                    <Label class="message" text="Hello, driver!" col="0" row="0"/>
                </GridLayout>
                -->
                <ScrollView>
                    <StackLayout class="home-panel">
                        <!--Add your page content here-->
                        <Label textWrap="true" text="Vehicle Capacity"
                            class="h2 description-label" />
                        
                        <Label textWrap="true" :text="this.textFieldValue"
                            class="h2 description-label" />

                        <TextField v-model="textFieldValue"
                            hint="Enter your vehicle's capacity" />

                        <Button text="Submit" @tap="onButtonTap" />

                        <Label textWrap="true" text="Inventory Info"
                            class="h2 description-label" />

                        <CardView v-bind:key="item" v-for="item in items" class="card" elevation="40" radius="10" ios:shadowRadius="3">
                            <StackLayout class="card-layout">
                                <Label class="body" :text="item.to" />
                                <Label class="body" textWrap="true" :text="item.from" />
                                <Label class="body" textWrap="true" :text="item.quantity" />
                            </StackLayout>
                        </CardView>

                        <Button text="Select" @tap="onButtonTap" />


                    </StackLayout>
                </ScrollView>
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
    import Vue from 'nativescript-vue';

    Vue.registerElement(
        'CardView',
        () => require('@nstudio/nativescript-cardview').CardView
    );

    export default {
        methods: {
            onButtonTap() {
                this.textFieldValue = 'Button was pressed';
            }
        },

        data() {
            return {
                textFieldValue: "",
                items: [
                    { to: "Foodbasic", from: "Red Cross", quantity: "15" },
                    { to: "Metro", from: "Salvation Army", quantity: "7" },
                ]
            };
        }
    };



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
