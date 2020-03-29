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

                        <GridLayout rows="*" columns="*, *"  v-for="i in rowCount" :key="i">
                            <CardView class="card" margin="10" col="0" radius="6" elevation="20" v-if="Items[(i - 1) * itemsPerRow] && Items[(i - 1) * itemsPerRow ].name" >
                                <GridLayout class="card-layout" rows="120, auto,auto,auto" columns="*, *, *">
                                    <Label :text="Items[(i - 1) * itemsPerRow].foodBankId" class="" row="1" colSpan="3" />
                                    <Label :text="Items[(i - 1) * itemsPerRow].groceryStoreId" class="" row="2" colSpan="3" />
                                    <Label :text="Items[(i - 1) * itemsPerRow].quantity" class="" row="2" colSpan="3" />
                                    <Button row="3" colSpan="3" text="Select" class="btn m-t-20 add-button" />
                                </GridLayout>
                            </CardView>
                            <CardView class="card" margin="10" col="1" elevation="20" v-if="Items[(i - 1) * itemsPerRow +1] && Items[(i - 1) * itemsPerRow +1].name" >
                                <GridLayout class="card-layout" rows="120, auto,auto,auto" columns="*, *, *">
                                    <Label :text="Items[(i - 1) * itemsPerRow].foodBankId" class="" row="1" colSpan="3" />
                                    <Label :text="Items[(i - 1) * itemsPerRow].groceryStoreId" class="" row="2" colSpan="3" />
                                    <Label :text="Items[(i - 1) * itemsPerRow].quantity" class="" row="2" colSpan="3" />
                                    <Button row="3" colSpan="3" text="Select" class="btn m-t-20 add-button" />
                                </GridLayout>
                            </CardView>
                    </GridLayout>

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
    import firebase from "nativescript-plugin-firebase";

    export default {
        data() {
            return {
                textFieldValue: "",
                Items: [
                ],
                itemsPerRow:2
            };
        },
        created() {
            let that = this
            firebase.firestore
                .collection("Orders")
                .where("quantity", ">=", "6").where("quantity", "<=", "15")
                .get()
                .then(snapshot => {
                    let itemArr = [];
                    snapshot.forEach(document => {
                        itemArr.push(document.data());
                    });
                    console.log(document.data());
                    that.Items = itemArr
                });
        },
        
        computed: {
            rowCount: function() {
                return Math.ceil(this.Items.length / this.itemsPerRow);
            },
        },        
        methods: {
                onButtonTap() {
                    this.textFieldValue = 'Button was pressed';
                }
        }
    };



</script>

<style scoped lang="scss">
    @import '~@nativescript/theme/scss/variables/blue';
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
