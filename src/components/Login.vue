<template>
    <div>
        <md-card class="card_main md-primary">
            <md-card-header>
                <md-content class="md-display-1 md-primary">
                    Connexion
                </md-content>
            </md-card-header>
        </md-card>

        <md-card class="card_main md-accent">
            <md-card-content>
                <md-content class="md-title md-accent">
                    Identifiant
                </md-content>

                <md-field class="md-accent">
                    <md-input v-model="identifiant" class="input md-primary" type="text" required />
                </md-field>

                <md-content class="md-title md-accent">
                    Mot de passe
                </md-content>

                <md-field class="md-accent">
                    <md-input v-model="password" class="input md-primary" type="password" required />
                </md-field>
            </md-card-content>
        </md-card>

        <div id="div_buttons">
            <md-button class="md-primary md-raised buttons" @click="validate" :disabled="identifiant === '' || password === ''" >
                Se connecter
            </md-button>

            <md-button class="md-primary md-raised buttons" @click="$router.push('/register')">
                Créer un compte
            </md-button>
        </div>

        <div id="div_loading" v-if="isLoading">
            <md-progress-bar class="md-accent" md-mode="indeterminate"></md-progress-bar>
        </div>

        <md-snackbar md-position="center" :md-duration="3000" :md-active.sync="showSnackBar">
            <span>Mot de passe ou identifiant incorrect</span>
        </md-snackbar>
    </div>
</template>

<script>
    import SixNezService from "../SixNezService";

    export default {
        name: "Login",
        mounted ()  {
            if (SixNezService.hasToken()) {
                this.$router.push("/");
            }
        },
        data: () => ({
            identifiant: "",
            password: "",
            showSnackBar: false,
            isLoading: false
        }),
        methods: {
            async validate() {
                this.isLoading = true;

                var response = await SixNezService.connect(this.identifiant, this.password);
                if (response == true) {
                    this.$router.push("/home");
                } else if (response == "400") {
                    this.showSnackBar = true;
                }

                this.isLoading = false;
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../styles/global.scss";

    .card_main, #div_buttons {
        text-align: center;
        margin: 3% auto;

        width: 50%;
    }

    .input {
        text-align: center;
    }

    .buttons {
        width: 40%;
    }

    #div_loading {
        width: 40%;
        text-align: center;
        margin: auto;
    }
</style>