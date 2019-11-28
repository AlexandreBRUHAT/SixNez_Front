<template>
    <div>
        <div v-if="film == null" id="div_chargement">
            <md-progress-spinner class="md-accent" :md-diameter="80" :md-stroke="8" md-mode="indeterminate" />
        </div>

        <div v-if="film != null" id="div_contenu">
            <md-content id="content_image" class="md-elevation-8 md-primary">
                <img src="https://m.media-amazon.com/images/M/MV5BMjA0YjYyZGMtN2U0Ni00YmY4LWJkZTItYTMyMjY3NGYyMTJkXkEyXkFqcGdeQXVyNDg4NjY5OTQ@._V1_SY1000_SX675_AL_.jpg">
            </md-content>

            <div id="card_texte">
                <div>
                    <md-card class="md-primary">
                        <md-card-header>
                            <md-content class="md-display-2 md-primary">{{ film.title }}</md-content>
                            <md-content class="md-subhead">{{ film.annee }}</md-content>
                        </md-card-header>
                    </md-card>
                </div>

                <div>
                    <md-button class="md-raised md-accent" v-for="cat in film.categories" v-bind:key="cat">{{ cat }}</md-button>
                </div>

                <md-card class="md-primary">
                    <md-card-header>
                        <md-content class="md-display-2 md-primary">Staff</md-content>
                    </md-card-header>
                </md-card>

                <div v-for="acteur in film.acteurs" v-bind:key="acteur.id" class="card_acteur">
                    <md-card md-with-hover class="md-accent">
                        <md-card-header>
                            <md-content class="md-title md-accent">{{ acteur.nomPrenom }}</md-content>

                            <md-content v-for="met in acteur.metier" v-bind:key="met" class="md-subhead md-accent">{{ met }}</md-content>
                        </md-card-header>
                    </md-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SixNezService from "../SixNezService";

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
        })
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

        text-align: center;
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

    .card_acteur {
        width: 30%;
        padding-right: 0.5%;
        padding-left: 0.5%;
        display: inline-block;
    }

</style>