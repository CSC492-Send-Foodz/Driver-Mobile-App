<template>
	<Page>
        <ScrollView>
            <FlexboxLayout class="page">
                <StackLayout class="form">
                    <Image class="logo" src="~/images/logo.png" />
                    <Label class="header" text="Senz Foodz" />

                    <StackLayout v-show="!isLoggingIn" class="input-field" marginBottom="15">
                        <TextField class="input" hint="Name" keyboardType="name" autocorrect="false" autocapitalizationType="none" v-model="user.name"
                        returnKeyType="next" @returnPress="focusPassword" fontSize="18" />
                        <StackLayout class="hr-light" />
                    </StackLayout>

                    <StackLayout class="input-field" marginBottom="15">
                        <TextField class="input" hint="Email" keyboardType="email" autocorrect="false" autocapitalizationType="none" v-model="user.email"
                        returnKeyType="next" @returnPress="focusPassword" fontSize="18" />
                        <StackLayout class="hr-light" />
                    </StackLayout>

                    <StackLayout class="input-field" marginBottom="15">
                        <TextField ref="password" class="input" hint="Password" secure="true" v-model="user.password" :returnKeyType="isLoggingIn ? 'done' : 'next'"
                        @returnPress="focusConfirmPassword" fontSize="18" />
                        <StackLayout class="hr-light" />
                    </StackLayout>

                    <StackLayout v-show="!isLoggingIn" marginBottom="15" class="input-field">
                        <TextField ref="confirmPassword" class="input" hint="Confirm password" secure="true" v-model="user.confirmPassword" returnKeyType="done"
                        fontSize="18" />
                        <StackLayout class="hr-light" />
                    </StackLayout>

                    <StackLayout v-show="!isLoggingIn" class="input-field">
                        <TextField class="input" hint="Capacity" keyboardType="capacity" autocorrect="false" autocapitalizationType="none" v-model="user.capacity"
                        returnKeyType="next" @returnPress="focusPassword" fontSize="18" />
                        <StackLayout class="hr-light" />
                    </StackLayout>

                    <Button :text="isLoggingIn ? 'Log In' : 'Sign Up'" @tap="submit" class="btn btn-primary m-t-20" />
                    <Label v-show="isLoggingIn" text="Forgot your password?" class="login-label" @tap="forgotPassword" />
                </StackLayout>

                <Label class="login-label sign-up-label" @tap="toggleForm">
                <FormattedString>
                    <Span :text="isLoggingIn ? 'Don’t have an account? ' : 'Back to Login'" />
                    <Span :text="isLoggingIn ? 'Sign up' : ''" class="bold" />
                </FormattedString>
                </Label>
            </FlexboxLayout>
        </ScrollView>
	</Page>
</template>

<script>
const userService = {
    register(user) {
        return Promise.resolve(user);
    },
    login(user) {
        return Promise.resolve(user);
    },
    resetPassword(email) {
        return Promise.resolve(email);
    }
};

import App from "./App.vue"

export default {
    data() {
        return {
            isLoggingIn: true,
            user: {
                email: "",
                password: "",
                confirmPassword: "",
                name: "",
                capacity: ""
            }
        };
    },
    methods: {
        toggleForm() {
            this.isLoggingIn = !this.isLoggingIn;
        },

        submit() {
            if (!this.user.email || !this.user.password) {
                this.alert(
                    "Please provide both an email address and password."
                );
                return;
            }
            if (this.isLoggingIn) {
                this.login();
            } else {
                this.register();
            }
        },

        login() {
            userService
                .login(this.user)
                .then(() => {
                    this.$navigateTo(App);
                })
                .catch(() => {
                    this.alert("Unfortunately we could not find your account.");
                });
        },

        register() {
            if (this.user.password != this.user.confirmPassword) {
                this.alert("Your passwords do not match.");
                return;
            }

            userService
                .register(this.user)
                .then(() => {
                    this.alert("Your account was successfully created.");
                    this.isLoggingIn = true;
                })
                .catch(() => {
                    this.alert(
                        "Unfortunately we were unable to create your account."
                    );
                });
        },

        forgotPassword() {
            prompt({
                title: "Forgot Password",
                message:
                    "Enter the email address you used to register for Senz Foodz to reset your password.",
                inputType: "email",
                defaultText: "",
                okButtonText: "Ok",
                cancelButtonText: "Cancel"
            }).then(data => {
                if (data.result) {
                    userService
                        .resetPassword(data.text.trim())
                        .then(() => {
                            this.alert(
                                "Your password was successfully reset. Please check your email for instructions on choosing a new password."
                            );
                        })
                        .catch(() => {
                            this.alert(
                                "Unfortunately, an error occurred resetting your password."
                            );
                        });
                }
            });
        },

        focusPassword() {
            this.$refs.password.nativeView.focus();
        },
        focusConfirmPassword() {
            if (!this.isLoggingIn) {
                this.$refs.confirmPassword.nativeView.focus();
            }
        },

        alert(message) {
            return alert({
                title: "Senz Foodz",
                okButtonText: "OK",
                message: message
            });
        }
    }
};
</script>

<style scoped>
	.page {
		align-items: center;
		flex-direction: column;
	}

	.form {
		margin-left: 30;
		margin-right: 30;
		flex-grow: 2;
		vertical-align: middle;
	}

	.logo {
		margin-bottom: 2;
		height: 90;
		font-weight: bold;
	}

	.header {
		horizontal-align: center;
		font-size: 25;
		font-weight: 600;
		margin-bottom: 70;
		text-align: center;
		color: rgb(16, 150, 34);
	}

	.input-field {
		margin-bottom: 25;
	}

	.input {
		font-size: 18;
		placeholder-color: #A8A8A8;
	}

	.input-field .input {
		font-size: 54;
	}

	.btn-primary {
		height: 50;
		margin: 30 5 15 5;
		background-color: rgb(129, 202, 111);
		border-radius: 5;
		font-size: 20;
		font-weight: 600;
	}

	.login-label {
		horizontal-align: center;
		color: #A8A8A8;
		font-size: 16;
	}

	.sign-up-label {
		margin-bottom: 20;
	}

	.bold {
		color: #000000;
	}
</style>