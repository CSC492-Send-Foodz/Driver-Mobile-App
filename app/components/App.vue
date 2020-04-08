<template>
   <Page actionBarHidden="true">
        <TabView android:tabBackgroundColor="#fbc59c"
                 android:tabTextColor="#c4ffdf"
                 android:selectedTabTextColor="#ffffff"
                 androidSelectedTabHighlightColor="#ffffff">
            <TabViewItem title="Inventory Info">
                <!--
                <GridLayout columns="*" rows="*">
                    <Label class="message" text="Hello, driver!" col="0" row="0"/>
                </GridLayout>
                -->
                <ScrollView>
                    <StackLayout class="home-panel">
                        <!--Add your page content here-->
                        <Label textWrap="true" text="Inventory Info"
                            class="h2 description-label" />
                        <CardView v-bind:key="item" v-for="item in items" class="card" elevation="40" radius="10" ios:shadowRadius="3">
                            <StackLayout class="card-layout">
                                <Label class="h2" :text="item.heading" />
                                <Label class="body" textWrap="true" :text="item.content" />
                                <button> Add</button>
                                <button> Remove</button>
                            </StackLayout>
                        </CardView>
                    />
                    </StackLayout>
                </ScrollView>
            </TabViewItem>


            <TabViewItem title="Active Orders">
                <GridLayout columns="*" rows="*">
                    <Label class="message" text="See list of orders as cards here" col="0" row="0"/>
                </GridLayout>
            </TabViewItem>

        </TabView>
    </Page>
</template>

<script >
    import firebase from 'nativescript-plugin-firebase'
    const isPlayground = true; // change this to show card view on android when building locally

    export default {
       data() {
            return {
                items: [
                    { heading: "Bulbasaur", content: "Bulbasaur can be seen napping in bright sunlight. There is a seed on its back. By soaking up the sun’s rays, the seed grows progressively larger." },
                    { heading: "Ivysaur", content: "To support its weight, Ivysaur’s legs and trunk grow thick and strong. If it starts spending more time lying in the sunlight, it’s a sign that the bud will bloom into a large flower soon." },
                    { heading: "Venusaur", content: "There is a large flower on Venusaur’s back. The flower is said to take on vivid colors if it gets plenty of nutrition and sunlight. The flower’s aroma soothes the emotions of people." },
                    { heading: "Charmander", content: "The flame that burns at the tip of its tail is an indication of its emotions. The flame wavers when Charmander is enjoying itself. If the Pokémon becomes enraged, the flame burns fiercely." },
                ]
            }
        },
        created() {
            /**
            let that = this
            return firebase.firestore
                .collection("Orders")
                .where("quantity", ">=", "6").where("quantity", "<=", "15")
                .get()
                .then(snapshot => {
                    let itemArr = [];
                    snapshot.forEach(document => {
                        itemArr.push(document.data());
                    });
                    that.Items = itemArr
                });
                **/
        },
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
