<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md6>
                <v-card class="elevation-12">
                    <v-toolbar color="primary" dark flat>
                        <v-toolbar-title>Registration form</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form v-model="valid" ref="form" lazy-validation>
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
                            <v-text-field
                                    label="Confirm password"
                                    name="confirm-password"
                                    prepend-icon="lock"
                                    type="password"
                                    v-model="confirmPassword"
                                    :counter="6"
                                    :rules="ConfirmPasswordRules"

                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions style="display: flex; align-items: center;justify-content: center">
                        <v-btn color="primary" @click="onSubmitForm" :disabled="!valid || loading" :loading="loading">Create account</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "Registration",
        data: () => ({
            email: '',
            password: '1234',
            confirmPassword: '',
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
            ConfirmPasswordRules() {
                if (this.password) {
                    return [
                        v => !!v || 'Password is required',
                        v => v === this.password || 'Confirm Password must be equal to password '
                    ];
                }
            },
            loading() {
                return this.$store.getters.loading;
            }
        },
        methods: {
         async   onSubmitForm() {
                //logic
                if (this.$refs.form.validate()) {
                    const user = {
                        email: this.email,
                        password: this.password
                    };
                    try {
                        await this.$store.dispatch('registerUser', user);
                        this.$router.push('/');
                    }
                    catch (e) {

                    }
                }

            }
        }
    }
</script>

<style scoped>

</style>