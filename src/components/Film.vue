<template>
    <div>
        <div v-if="film == null" id="div_chargement">
            <md-progress-spinner class="md-accent" :md-diameter="80" :md-stroke="8" md-mode="indeterminate" />
        </div>

        <div v-if="film != null" id="div_contenu">
            <md-content id="content_image" class="md-elevation-8 md-primary">
                <img v-if="film.imgURL != null && film.imgURL != ''" v-bind:src="film.imgURL">
                <img v-if="film.imgURL == null || film.imgURL == ''" src="../assets/no_img.png">
            </md-content>

            <div id="card_texte">
                <div>
                    <md-card class="md-primary">
                        <md-card-header>
                            <md-content class="md-display-2 md-primary">{{ film.title }}</md-content>
                            <md-content class="md-title md-primary">{{ film.annee }}</md-content>
                        </md-card-header>
                    </md-card>
                </div>

                <div>
                    <md-button class="md-raised md-accent" v-for="cat in film.categories" v-bind:key="cat">{{ translateCategorie(cat) }}</md-button>
                </div>

                <md-card class="md-primary" id="card_equipe">
                    <md-card-header>
                        <md-content class="md-display-2 md-primary">Equipe</md-content>
                    </md-card-header>
                </md-card>

                <div v-for="acteur in film.acteurs" v-bind:key="acteur.id" class="div_acteur">
                    <md-card md-with-hover class="md-accent card_acteur">
                        <md-card-content>
                            <md-content class="md-title md-accent">{{ acteur.nomPrenom }}</md-content>

                            <md-content v-for="met in acteur.metier" v-bind:key="met" class="md-subhead md-accent">{{ translateJob(met) }}</md-content>
                        </md-card-content>
                    </md-card>
                </div>
        </div>
        </div>
    </div>
</template>

<script>
    import SixNezService from "../SixNezService";
    import TraductionService from "../TraductionService";

    export default {
        name: "Film",
        async mounted () {
            this.film = await SixNezService.getFilm(this.id);
        },
        props: {
            id: {
                type: String,
                required: true
            }
        },
        data: () => ({
            film: null
        }),
        methods: {
            translateJob(met) {
                return TraductionService.translateJobs(met);
            },

            translateCategorie(cat) {
                return TraductionService.translateCategorie(cat);
            }
        }
    }
</script>

<style scoped lang="scss">

    #div_chargement {
        text-align: center;

        padding-top: 5%;
        width: 100%;
        margin: auto;
    }

    #div_contenu {
        width: 100%;
        margin: 0;

        text-align: center;
    }

    #content_image {
        display: inline-block;

        padding: 1% 1% 1% 1%;
        margin: 1% 1% 1% 1%;
        width: 30%;
        height: 80vh;

        text-align: center;
    }

    img {
        width: 100%;
        display: inline-block;
    }

    #card_texte {
        display: inline-block;
        width: 50%;

        margin: auto;
        text-align: center;

        padding-left: 5%;
        padding-top: 2%;
        vertical-align: top;
    }

    #card_equipe {
        margin-top: 10%;
    }

    .div_acteur {
        width: 30%;
        padding-right: 0.5%;
        padding-left: 0.5%;
        margin-bottom: 2%;
        display: inline-table;

        height: 20vh;
        vertical-align: middle;
    }

    .card_acteur {
        height: 100%;
        display: table-cell;
        vertical-align: middle;
    }

</style>