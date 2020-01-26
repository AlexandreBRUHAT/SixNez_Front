<template>
    <div>
        <md-toolbar id="toolbar_filters" class="md-layout md-gutter md-alignment-center md-primary">
            <md-button id="bouton_precedent" @click="currentPage--" :style="{visibility: this.currentPage == 0 ? 'hidden' : 'visible'}" class="md-layout-item">
                Précédent
            </md-button>

            <md-field id="field_category" class="md-layout-item">
                <label>Catégorie</label>
                <md-select v-model="category" id="select_category">
                    <md-option value="none">Toutes</md-option>

                    <md-option v-for="genre in genres" :key="genre" :value="genre">{{ translateGenre(genre) }}</md-option>
                </md-select>
            </md-field>

            <md-field class="md-layout-item">
                <label class="md-theme-default">Titre</label>
                <md-input v-model="titre" v-on:change="onTitre" class="md-accent" />
            </md-field>

            <md-button id="bouton_suivant" @click="currentPage++" :style="{visibility: nextMovie != null ? 'visible' : 'hidden'}" class="md-layout-item">
                Suivant
            </md-button>
        </md-toolbar>

        <SpinnerLoader v-if="isLoading" />

        <div id="div_containing_cards" v-if="!isLoading">
            <FilmCard v-for="film in films" v-bind:key="film.id" :film="film" />
        </div>
    </div>
</template>

<script>
    import SixNezService from "../../services/SixNezService";
    import SpinnerLoader from "../SpinnerLoader";
    import FilmCard from "./FilmCard";
    import TraductionService from "../../services/TraductionService";

    const PAGE_SIZE = 28;

    export default {
        name: "Films",
        components: {FilmCard, SpinnerLoader},
        async mounted () {
            this.updatePage();

            this.genres = await this.updateGenres();
        },
        data: () => ({
            films: null,
            genres: [],
            currentPage: 0,
            nextMovie: null,
            category: null,
            titre: null,
            isLoading: false
        }),
        methods: {
            async updatePage() {
                this.isLoading = true;
                this.nextMovie = null;

                this.films = await SixNezService.getFilms(this.currentPage, PAGE_SIZE, this.category, this.titre);
                this.nextMovie = await SixNezService.getFilms((this.currentPage + 1) * PAGE_SIZE, 1, this.category, this.titre);

                let ids = [];
                this.films.forEach(film => {
                    ids.push({ id: film.id });
                });

                SixNezService.getPictures(ids).then(pictures => {
                    pictures.forEach(picture => {
                        this.films.forEach(film => {
                            if (film.id == picture.id) {
                                film.imgURL = picture.imgURL;
                            }
                        });
                    })
                });

                this.isLoading = false;
            },

            async updateGenres() {
                return await SixNezService.getGenres();
            },

            onTitre() {
                this.updatePage();
            },

            translateGenre(genre) {
                return TraductionService.translateCategorie(genre);
            }
        },
        watch: {
            currentPage: async function () {
                this.updatePage();
            },

            category: function () {
                if (this.category === "none") {
                    this.category = null;
                }

                if (this.currentPage == 0) this.updatePage();
                else this.currentPage = 0;
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../styles/global";

    #toolbar_filters {
        width: 94%;

        position: fixed;
        margin-top: 0%;
        margin-left: 3%;
        height: 8ch;
        z-index: 5;
    }

    .md-layout-item {
        margin-left: 2%;
        margin-right: 2%;
    }

    #div_containing_cards {
        padding-top: 10ch;
        padding-left: 2.5%;
        padding-right: 2.5%;
    }

</style>