<template>
    <div class="div_center">
        <md-card class="card_main md-primary">
            <md-card-header>
                <md-content class="md-display-1 md-primary">
                    Bienvenue sur SixNez !
                </md-content>
            </md-card-header>
        </md-card>
        
        <md-content class="content_text md-title">
            Rechercher des films, des acteurs et apprenez-en plus sur le monde du cinéma !
        </md-content>
        
        <img src="../assets/logo.png" />

        <md-content id="content_credit" class="content_text">
            Projet 'SixNez'<br>
            BRUHAT Alexandre - CHATELAIN Thibault - CIAVALDINI Ilorian<br>
            27 janvier 2020
        </md-content>
    </div>
</template>

<script>
    export default {
        name: "Home"
    }
</script>

<style scoped lang="scss">

    .card_main {
        margin: 2% auto;

        width: 50%;
    }

    .div_center {
        text-align: center;
    }

    .content_text {
        background-color: transparent;
    }

    img {
        margin-top: 1%;
    }

    #content_credit {
        text-align: right;
        margin-top: 5px;
        margin-right: 2%;
    }

</style>