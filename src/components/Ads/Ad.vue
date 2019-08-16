<template>
    <v-container>
        <v-layout row>
            <v-flex xs12>
            <v-card v-if="!loading">
                <v-img :src="ad.imageScr"
                height="300"
                ></v-img>
                <v-card-text><h1 class="text--primary">{{ad.title}}</h1>
                <p>{{ad.description}}</p></v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>

                    <app-edit-ad-modal v-bind:ad="ad" v-if="isOwner"></app-edit-ad-modal>
                    <app-buy-modal :ad="ad"></app-buy-modal>

                </v-card-actions>
            </v-card>
                <div v-else>
                    <v-container>
                        <v-layout row>
                            <v-flex xs12 class="text-xl-center pt-5" offset-sm6>
                                <v-progress-circular
                                        indeterminate
                                        :size="100"
                                        :width="4"
                                        color="purple"></v-progress-circular>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import EditAdModal from "./EditAdModal";

    export default {
        name: "Ad",
        props: {
            id: String
        },
        components:{
            appEditAdModal:EditAdModal
        },
        computed:{
            loading(){
              return this.$store.getters.loading;
            },
            isOwner(){
              return this.ad.ownerId === this.$store.getters.user.id
            },
            ad(){
                const id = this.id;
                return this.$store.getters.adById(id);
            }
        }
    }
</script>

<style scoped>

</style>