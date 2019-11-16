<template>
    <div>
        <div id="div_titre">
            <md-content id="content_creation" class="md-title md-primary">
                Création compte
            </md-content>
        </div>

        <form>
            <div id="div_form">
                <md-content id="content_identifiant" class="md-title md-primary">
                    Identifiant
                </md-content>

                <md-field id="field_identifiant" class="md-theme-default" :class="getError != null ? 'md-invalid' : null">
                    <md-input id="input_identifiant" type="text" v-model="identifiant" @input="identifiant_changed" required />
                    <span class="md-error">{{ getError }}</span>
                </md-field>

                <md-content id="content_password" class="md-title md-primary">
                    Mot de passe
                </md-content>

                <md-field id="field_password">
                    <md-input id="input_password" v-model="password1" type="password" class="md-primary" required />
                </md-field>

                <md-content id="content_password_confirmation" class="md-title md-primary">
                    Confirmation mot de passe
                </md-content>

                <md-field id="field_password_confirmation">
                    <md-input id="input_password_confirmation" v-model="password2" type="password" class="md-primary" required />
                </md-field>
            </div>

            <div id="div_buttons">
                <md-button id="button_valider" :disabled="!checkPasswords" @click="validate">
                    <md-content class="md-primary">Créer compte</md-content>
                </md-button>
            </div>

        </form>
    </div>
</template>

<script>
    import SixNezService from "../SixNezService";

    export default {
        name: "Register",
        data: () => ({
            identifiant: null,
            password1: null,
            password2: null,
            regex: new RegExp("[^a-zA-Z0-9]"),
            identifiantExists: null
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

                var response = await SixNezService.register(this.identifiant, this.password1);
                if (response == true) {
                    this.$router.push("/login");
                } else if (response == "400") {
                    // identifiant deja utilise
                    this.identifiantExists = true;
                }
            },
            identifiant_changed () {
                if (this.identifiantExists == true) this.identifiantExists = false;
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../styles/global.scss";

    #div_titre, #div_form, #button_valider {
        border-radius: 15px;
        border-style: none;
        box-shadow: 3px 3px 3px gray;

        background-color: $color-primary;

        text-align: center;
    }

    #div_titre, #div_form {
        margin-left: 25%;
        margin-right: 25%;
        padding-top: 1%;
        padding-bottom: 1%;
    }

    #div_titre {
        margin-top: 5%;
    }

    #content_identifiant, #content_password {
        margin-top: 1%;
    }

    #div_form {
        margin-top: 2%;
    }

    #field_identifiant, #field_password, #field_password_confirmation {
        width: 30%;
        margin: auto;
        margin-bottom: 20px;
    }

    #input_identifiant, #input_password, #input_password_confirmation {
        width: 100%;
        text-align: center;
    }

    #div_buttons {
        text-align: center;
        margin-top: 5%;
    }

    #button_valider {
        margin-left: 40%;
        margin-right: 40%;

        width: 18%;
    }

    .md-primary {
        background: none !important;
    }

    #button_valider:hover {
        width: 20%;
    }

    #button_valider:disabled {
        background: fade_out($color-primary, 0.6);
    }
</style>