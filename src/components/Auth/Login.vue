<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md6>
                <v-card class="elevation-12">
                    <v-toolbar color="primary" dark flat>
                        <v-toolbar-title>Login form</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form v-model="valid" ref="form" validation>
                            <v-text-field
                                    label="Email"
                                    name="email"
                                    prepend-icon="person"
                                    type="email"
                                    v-model="email"
                                    :rules="emailRules"
                            ></v-text-field>

                            <v-text-field
                                    label="Password"
                                    name="password"
                                    prepend-icon="lock"
                                    type="password"
                                    v-model="password"
                                    :counter="6"
                                    :rules="passwordRules"

                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions style="display: flex; align-items: center;justify-content: center">
                        <v-btn color="primary" style="width: 100px" @click="onSubmitForm" :loading="loading"
                               :disabled="!valid">Login
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "Login",
        data: () => ({
            email: '',
            password: '',
            valid: false,
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            passwordRules: [
                v => !!v || 'Password is required',
                v => (v && v.length >= 6) || 'Password must be equal or more than 6 characters'
            ]
        }),
        computed: {
            loading() {
                return this.$store.getters.loading;
            }
        },
        methods: {
            async onSubmitForm() {
                //logic
                if (this.$refs.form.validate()) {
                    const user = {
                        email: this.email,
                        password: this.password
                    };
                    try{
                   await this.$store.dispatch('loginUser', user);
                    this.$router.push('/');
                        }
                        catch (e) {

                        }
                }

            }
        },
        created() {
            if(this.$route.query['loginError']){
                this.$store.dispatch('setError','Please log in to access this page.');
            }
        }
    }
</script>

<style scoped>

</style>