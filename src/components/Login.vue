<template>
    <div>
        <div id="div_titre">
            <md-content class="md-title md-primary">
                Connexion
            </md-content>
        </div>

        <div id="div_form">
            <md-content id="content_identifiant" class="md-title md-primary">
                Identifiant
            </md-content>

            <md-field id="field_identifiant" class="md-theme-default">
                <md-input v-model="identifiant" id="input_identifiant" type="text" required />
            </md-field>

            <md-content id="content_password" class="md-title md-primary">
                Mot de passe
            </md-content>

            <md-field id="field_password">
                <md-input id="input_password" type="password" class="md-primary" required />
            </md-field>
        </div>

        <div id="div_buttons">
            <md-button id="button_valider">
                <md-content class="md-primary">Se connecter</md-content>
            </md-button>

            <md-button id="button_creer" v-on:click="$router.push('/register')">
                <md-content class="md-primary">Créer un compte</md-content>
            </md-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data: () => ({
            hasErrors: false,
            identifiant: null
        }),
        computed: {
            hasErrorsClass () {
                return {
                    'md-invalid': this.hasErrors
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../styles/global.scss";

    #div_titre, #div_form, #button_valider, #button_creer {
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

    #field_identifiant, #field_password {
        width: 30%;
        margin: auto;
    }

    #input_identifiant, #input_password {
        width: 100%;
        text-align: center;
    }

    #div_buttons {
        text-align: center;
        margin-top: 5%;
    }

    #button_creer, #button_valider {
        margin-left: 40%;
        margin-right: 40%;

        width: 18%;
    }

    #button_creer:hover, #button_valider:hover {
        width: 20%;
    }
</style>