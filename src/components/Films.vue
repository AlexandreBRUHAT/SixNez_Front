<template>
    <div>
        <div id="div_filters">
            <md-button class="filter_button">
                <md-content class="md-primary filter_button_content">Filtre1</md-content>
            </md-button>

            <md-button class="filter_button">
                <md-content class="md-primary filter_button_content">Filtre2</md-content>
            </md-button>

            <md-button class="filter_button">
                <md-content class="md-primary filter_button_content">Filtre3</md-content>
            </md-button>
        </div>

        <div id="div_containing_cards">
            <div v-for="film in films" v-bind:key="film.id" @click="$router.push({ name: 'film', params: { id: film.id }})" class="div_card">
                <md-card md-with-hover>
                    <md-button class="md-icon-button md-list-action" @click="console.log('a')">
                        <md-icon class="md-primary">star</md-icon>
                    </md-button>

                    <md-ripple>
                        <md-card-header>
                            <md-content class="md-title div_titre">{{ film.titre }}</md-content>
                            <md-content class="md-subhead div_annee">{{ film.annee }}</md-content>
                        </md-card-header>

                        <md-card-content>
                            <img v-bind:src="film.img">
                        </md-card-content>
                    </md-ripple>
                </md-card>
            </div>
        </div>
    </div>
</template>

<script>
    //import SixNezService from "../SixNezService";

    export default {
        name: "Films",
        mounted () {
            //SixNezService.getFilms(0, 20);
        },
        data: () => ({
            films: [{ titre: "Frozen II", annee: "2018", id: "tt4520988", img: "https://m.media-amazon.com/images/M/MV5BMjA0YjYyZGMtN2U0Ni00YmY4LWJkZTItYTMyMjY3NGYyMTJkXkEyXkFqcGdeQXVyNDg4NjY5OTQ@._V1_SY1000_SX675_AL_.jpg" }]
        })
    }
</script>

<style scoped lang="scss">
    @import "../styles/global";

    #div_filters {
        width: 100%;
        background: fade_out($color-primary, 0.2);

        border-bottom-width: 10px;
        border-bottom-style: solid;
        border-bottom-color: $color-primary;

        position: sticky;
        margin-top: 0%;

        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 5%;
        padding-right: 5%;
        text-align: center;
    }

    .filter_button {
        width: 16%;
        margin-left: 5%;
        margin-right: 5%;
    }

    .md-primary {
        background: none !important;
    }

    #div_containing_cards {
        padding-top: 1%;
        margin-left: 2.5%;
        margin-right: 2.5%;
    }

    .div_card {
        width: 15%;

        position: relative;

        margin-left: 5%;
        margin-right: 5%;
        margin-bottom: 5%;

        display: inline-block;

        border-color: fade_out($color-primary, 0.8);
        border-style: inset;
        border-width: 4px;
    }

    .div_card_header {

    }

    .div_card:hover {

        /*border-left-color: $color-primary;
        border-right-color: $color-primary;
        border-left-style: solid;
        border-right-style: solid;
        border-left-width: 1px;
        border-right-width: 1px;*/

        border-color: fade_out($color-primary, 0.2);
    }

    .div_titre, .div_annee {
        text-align: center;
    }
</style>