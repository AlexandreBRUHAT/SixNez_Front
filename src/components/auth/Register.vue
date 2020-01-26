<template>
    <div>
        <md-card class="card_main md-primary">
            <md-card-header>
                <md-content class="md-display-1 md-primary">
                    Création compte
                </md-content>
            </md-card-header>
        </md-card>

        <form>
            <md-card class="card_main md-accent">
                <md-card-content>
                    <md-content class="md-title md-accent">
                        Identifiant
                    </md-content>

                    <md-field id="field_identifiant" class="md-primary" :class="getError != null ? 'md-invalid' : null">
                        <md-input class="input md-primary" type="text" v-model="identifiant" @input="identifiant_changed" required />
                        <span class="md-error md-primary">{{ getError }}</span>
                    </md-field>

                    <md-content class="md-title md-accent">
                        Mot de passe
                    </md-content>

                    <md-field id="field_password">
                        <md-input v-model="password1" type="password" class="input md-primary" required />
                    </md-field>

                    <md-content class="md-title md-accent">
                        Confirmation mot de passe
                    </md-content>

                    <md-field id="field_password_confirmation">
                        <md-input v-model="password2" type="password" class="input md-primary" required />
                    </md-field>
                </md-card-content>
            </md-card>

            <div id="div_buttons">
                <md-button class="md-primary md-raised button" :disabled="!checkPasswords" @click="validate">
                    Créer compte
                </md-button>
            </div>

            <div id="div_loading" v-if="isLoading">
                <md-progress-bar class="md-accent" md-mode="indeterminate"></md-progress-bar>
            </div>
        </form>
    </div>
</template>

<script>
    import SixNezService from "../../services/SixNezService";

    export default {
        name: "Register",
        data: () => ({
            identifiant: null,
            password1: null,
            password2: null,
            regex: new RegExp("[^a-zA-Z0-9]"),
            identifiantExists: null,
            isLoading: false
        }),
        computed: {
            checkPasswords () {
                if (this.identifiant == null || this.password1 == null || this.password2 == null) return false;
                if (this.identifiant == "" || this.password1 == "" || this.password2 == "") return false;
                if (this.regex.test(this.identifiant)) return false;

                return this.password1 == this.password2;
            },
            checkCharacters () {
                return this.regex.test(this.identifiant);
            },
            getError() {
                if (this.checkCharacters) return "Caractère non autorisé";
                else if (this.identifiantExists) return "Identifiant déjà utilisé";
                return null;
            }

        },
        methods: {
            async validate () {
                if (!this.checkPasswords) return;
                if (this.checkCharacters) return;

                this.isLoading = true;

                var response = await SixNezService.register(this.identifiant, this.password1);
                if (response == true) {
                    this.$router.push("/login");
                } else if (response == "400") {
                    // identifiant deja utilise
                    this.identifiantExists = true;
                }

                this.isLoading = false;
            },
            identifiant_changed () {
                if (this.identifiantExists == true) this.identifiantExists = false;
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../styles/global";

    .card_main, #div_buttons {
        text-align: center;
        margin: 3% auto;

        width: 50%;
    }

    .input {
        text-align: center;
    }

    .button {
        width: 40%;
    }

    #div_loading {
        width: 40%;
        text-align: center;
        margin: auto;
    }

</style>