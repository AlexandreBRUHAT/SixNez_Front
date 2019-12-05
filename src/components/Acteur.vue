<template>
    <div>
        <SpinnerLoader v-if="acteur == null" />

        <div v-if="acteur != null">
            <div id="div_nom">
                <md-card class="md-primary">
                    <md-card-header>
                        <md-content class="md-display-2 md-primary">
                            {{ acteur.nomPrenom }}
                        </md-content>
                    </md-card-header>
                </md-card>
            </div>

            <div id="div_nais_mort">
                <md-card id="card_nais" class="md-accent">
                    <md-card-header class="md-accent md-layout">
                        <md-icon class="md-layout-item">emoji_people</md-icon>
                        <md-content class="md-accent md-layout-item">Naissance : {{ acteur.naissance }}</md-content>
                    </md-card-header>
                </md-card>

                <md-card id="card_mort" class="md-accent" v-if="acteur.mort != null">
                    <md-card-header class="md-accent md-layout">
                        <md-icon class="md-layout-item">nights_stay</md-icon>
                        <md-content class="md-accent md-layout-item">Décès : {{ acteur.mort }}</md-content>
                    </md-card-header>
                </md-card>
            </div>

            <div id="div_metiers">
                <md-content class="md-accent content_metier md-elevation-1" v-for="met in acteur.metier" :key="met">
                    {{ translateJob(met) }}
                </md-content>
            </div>

            <div id="div_titre_film">
                <md-card class="md-primary">
                    <md-card-header>
                        <md-content class="md-display-1 md-primary">
                            Films
                        </md-content>
                    </md-card-header>
                </md-card>
            </div>

            <div id="div_films">
                <div id="div_film" v-for="film in acteur.filmDTOS" :key="film.id" @click="$router.push({ name: 'film', params: { id: film.id }})">
                    <md-card class="card_film md-accent" md-with-hover>
                        <md-card-header>
                            <md-content class="md-accent">{{ film.name }}</md-content>
                        </md-card-header>
                    </md-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SixNezService from "../SixNezService";
    import TraductionService from "../TraductionService";
    import SpinnerLoader from "./SpinnerLoader";

    export default {
        name: "Acteur",
        components: {SpinnerLoader},
        async mounted () {
            this.acteur = await SixNezService.getActor(this.id);
        },
        props: {
            id: {
                type: String,
                required: true
            }
        },
        data: () => ({
            acteur: null
        }),
        methods: {
            translateJob(met) {
                return TraductionService.translateJobs(met);
            }
        }
    }
</script>

<style scoped lang="scss">

    #div_nom {
        width: 70%;
        margin: 1% auto auto;

        text-align: center;
    }

    #div_nais_mort {
        width: 30%;
        margin: 1% auto auto;
        text-align: center;
    }

    #card_nais, #card_mort {
        text-align: left;
    }

    #div_metiers {
        width: 80%;

        text-align: center;
        margin: 2% auto auto;
    }

    .content_metier {
        display: inline-block;
        width: 15%;
        margin-left: 1%;
        margin-right: 1%;

        padding-top: 1%;
        padding-bottom: 1%;
    }

    #div_titre_film {
        width: 70%;
        margin: 3% auto auto;

        text-align: center;
    }

    #div_films {
        width: 60%;
        text-align: center;
        margin: auto;
    }

    #div_film {
        display: inline-block;
        width: 30%;

        margin-left: 1%;
        margin-right: 1%;
    }

</style>