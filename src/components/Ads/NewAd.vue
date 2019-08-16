<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text--secondary mb-3">Create new ad</h1>
                <v-form v-model="valid" ref="form" validation class="mb-3">
                    <v-text-field
                            label="Ad title*"
                            name="title"
                            type="text"
                            v-model="title"
                            required
                            :rules="[v => !!v || 'Title is required']"
                    ></v-text-field>

                    <v-textarea
                            label="Ad description"
                            name="description"
                            type="text"
                            v-model="description"
                            :rules="[v => !!v || 'Description is required']"
                            multi-line
                    ></v-textarea>
                </v-form>
                <v-layout class="mb-3">
                    <v-flex xs12>
                        <v-btn class="ma-2 white--text warning" fab @click="triggerUpload">
                            <v-icon dark>cloud_upload</v-icon>
                        </v-btn>
                        <input
                                ref="fileInput"
                                type="file"
                                style="display: none"
                                accept="image/*"
                                @change="onFileChange">
                    </v-flex>
                </v-layout>
                <v-layout>
                    <v-flex xs12>
                        <img :src="imageSrc" height="100" v-if="imageSrc" alt="">
                    </v-flex>
                </v-layout>
                <v-layout>
                    <v-flex xs12>
                        <v-spacer></v-spacer>
                        <v-btn class="success"
                               @click="createAd"
                               :disabled="(!valid || !image) || loading"
                               :loading="loading"
                        >Create ad
                        </v-btn>
                        <v-switch
                                v-model="promo"
                                label="Ad to promo ? "
                                color="primary"
                        ></v-switch>
                    </v-flex>
                </v-layout>

            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "NewAd",
        data: () => ({
            promo: false,
            description: '',
            title: '',
            image: null,
            imageSrc: '',
            valid: false
        }),
        computed: {
            loading() {
                return this.$store.getters.loading;
            }
        },
        methods: {
            async createAd() {
                if (this.$refs.form.validate() && this.image) {
                    const ad = {
                        title: this.title,
                        description: this.description,
                        promo: this.promo,
                        imageScr: this.image
                    };
                    console.log(ad);
                    try {
                        await this.$store.dispatch('createAd', ad);
                        this.$router.push('/list')
                    } catch (e) {

                    }
                }
            },
            triggerUpload() {
                this.$refs.fileInput.click();
            },
            async onFileChange(event) {
                const file = event.target.files[0];
                const reader = new FileReader();
                reader.onload = () => {
                    this.imageSrc = reader.result;
                };
                reader.readAsDataURL(file);
                this.image = file;
            }
        }
    }
</script>

<style scoped>

</style>