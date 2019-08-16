<template>
    <v-dialog width="500px" v-model="modal">
        <template v-slot:activator="{ on }">
            <v-btn color="warning" text v-on="on">Edit</v-btn>
        </template>
        <v-card>
            <v-container>
                <v-layout row>
                    <v-flex xs12>
                        <v-card-title>
                            <h2 class="text--primary">Edit ad</h2>
                        </v-card-title>
                    </v-flex>
                </v-layout>

                <v-divider></v-divider>

                <v-layout row>
                    <v-flex xs12>
                        <v-card-text>
                            <v-text-field
                                    label="Title"
                                    name="title"
                                    type="text"
                                    v-model="editedTitle"
                            ></v-text-field>

                            <v-textarea
                                    label="Description"
                                    name="description"
                                    type="text"
                                    v-model="editedDescription"
                                    multi-line
                            ></v-textarea>
                        </v-card-text>
                    </v-flex>
                </v-layout>

                <v-divider></v-divider>

                <v-layout row>
                    <v-flex xs12>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text @click="onCancel">Cancel</v-btn>
                            <v-btn class="success" text @click="onSave">Save</v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>

</template>

<script>
    export default {
        name: "EditAdModal",
        props: {
            ad: Object
        },
        data: () => ({
            modal: false,
            editedTitle: '',
            editedDescription:''
        }),
        methods: {
            onCancel() {
                this.editedDescription = this.ad.description;
                this.editedTitle = this.ad.title;
                this.modal = false;
            },
            onSave() {
                if(this.editedDescription !== '' && this.editedTitle !== ''){
                    this.$store.dispatch('updateAd',{
                        title:this.editedTitle,
                        description:this.editedDescription,
                        id:this.ad.id
                    });
                    this.modal = false;

                }
            }
        },
        created() {
          this.editedTitle =  this.ad.title;
                this.editedDescription = this.ad.description
        }
    }
</script>

<style scoped>

</style>