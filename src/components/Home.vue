<template>
    <div v-if="!loading">
        <v-container fluid>
            <v-layout row>
                <v-flex xs12>
                    <v-carousel
                            cycle
                            height="400"
                            hide-delimiter-background
                            show-arrows-on-hover
                    >
                        <v-carousel-item
                                v-for="(ad,i) in promoAds"
                                :key="i"
                                :src="ad.imageScr"
                                :to="`/ad/${ad.id}`"
                        >
                            <!--  <div class="carosel-link">
                                  <v-btn class="error" :to="`/ad/${ad.id}`">{{ad.title}}</v-btn>
                              </div>-->
                        </v-carousel-item>
                    </v-carousel>
                </v-flex>
            </v-layout>
        </v-container>
        <v-container grid-list-lg>
            <v-layout row wrap v-if=" ads.length !== 0 ">
                <v-flex xs12
                        sm6
                        md4
                        v-for="(ad,i) in ads"
                        :key="i"
                >
                    <v-card class="mx-auto" max-width="400">
                        <v-img
                                class="white--text"
                                height="200px"
                                :src="ad.imageScr"
                        >
                            <v-card-title class="align-end fill-height">{{ad.title}}</v-card-title>
                        </v-img>

                        <v-card-text>
                            <div>{{ad.description}}</div>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text :to="`/ad/${ad.id}`">Open</v-btn>
                            <app-buy-modal :ad="ad"></app-buy-modal>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
            <v-layout v-else-if="!ads || ads.length === 0">
                <v-flex xs12 class="text-xs-center">
                    <h1 class="text--primary"> You have no ads</h1>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
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
</template>

<script>
    export default {
        name: "Home",
        computed: {
            loading(){
                return this.$store.getters.loading;
            },
            promoAds() {
                return this.$store.getters.promoAds;
            },
            ads(){
             return this.$store.getters.ads;
            }
        }
    }
</script>

<style scoped lang="sass">
    .carosel-link
        position: absolute
        bottom: 50px
        left: 50%
        background: rgba(0, 0, 0, .5)
        transform: translate(-50%, 0)
        padding: 5px 15px
        border-top-right-radius: 5px
        border-top-left-radius: 5px

</style>