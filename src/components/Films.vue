<template>
    <div>
        <md-toolbar id="toolbar_filters" class="md-layout md-gutter md-alignment-center md-primary">
            <md-button id="bouton_precedent" @click="previousPage" :style="{visibility: this.currentPage == 0 ? 'hidden' : 'visible'}" class="md-layout-item">
                Précédent
            </md-button>

            <md-field id="field_category" class="md-layout-item">
                <label>Catégorie</label>
                <md-select v-model="category" id="select_category">
                    <md-option value="none">Toutes</md-option>

                    <md-option v-for="genre in genres" :key="genre" :value="genre">{{ genre }}</md-option>
                </md-select>
            </md-field>

            <md-field class="md-layout-item">
                <label>Titre</label>
                <md-input v-model="titre" v-on:change="onTitre" />
            </md-field>

            <md-button id="bouton_suivant" @click="nextPage" :style="{visibility: hasMoreMovies ? 'visible' : 'hidden'}" class="md-layout-item">
                Suivant
            </md-button>
        </md-toolbar>

        <md-content id="div_containing_cards" class="md-scrollbar">
            <div v-for="film in getFilms" v-bind:key="film.id" @click="$router.push({ name: 'film', params: { id: film.id }})" class="div_film">
                <md-card md-with-hover class="card_film">
                    <md-ripple>
                        <div class="button_favourite">
                            <md-button class="md-icon-button md-list-action" @click="favourite($event, film.id)">
                                <md-icon class="md-primary" v-if="false">star</md-icon> <!-- TODO -->
                                <md-icon class="md-primary" v-if="true">star_border</md-icon>
                            </md-button>
                        </div>

                        <md-card-header>
                            <md-content class="md-title div_titre">{{ film.name }}</md-content>
                            <md-content class="md-subhead div_annee">{{ film.annee }}</md-content>
                        </md-card-header>

                        <md-card-content id="card_content_img">
                            <md-progress-spinner class="md-accent" :md-diameter="80" :md-stroke="8" md-mode="indeterminate" v-if="film.imgURL == null" />
                            <img v-bind:src="film.imgURL" v-if="film.imgURL != null && film.imgURL != ''">
                            <img src="../assets/no_img.png" v-if="film.imgURL != null && film.imgURL == ''">
                        </md-card-content>
                    </md-ripple>
                </md-card>
            </div>
        </md-content>
    </div>
</template>

<script>
    import SixNezService from "../SixNezService";

    const PAGE_SIZE = 28;

    export default {
        name: "Films",
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
            titre: null
        }),
        methods: {
            favourite(event, id) {
                event.stopPropagation();

                console.log(id);
            },

            async nextPage() {
                this.currentPage++;
            },

            async previousPage() {
                this.currentPage--;
            },

            async updatePage() {
                this.films = await SixNezService.getFilms(this.currentPage, PAGE_SIZE, this.category, this.titre);
                this.nextMovie = await SixNezService.getFilms((this.currentPage + 1) * PAGE_SIZE, 1, this.category, this.titre);

                let ids = [];
                this.films.forEach(film => {
                    ids.push({ id: film.id });
                });

                let pictures = await SixNezService.getPictures(ids);
                pictures.forEach(picture => {
                    this.films.forEach(film => {
                        if (film.id == picture.id) {
                            film.imgURL = picture.imgURL;
                        }
                    });
                })
            },

            async updateGenres() {
                return await SixNezService.getGenres();
            },

            onTitre() {
                this.updatePage();
            }
        },
        computed: {
            getFilms() {
                return this.films;
            },

            hasMoreMovies() {
                return this.nextMovie != null && this.nextMovie.length > 0;
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
    @import "../styles/global";

    #toolbar_filters {
        width: 94%;

        position: fixed;
        margin-top: 0%;
        margin-left: 3%;
        z-index: 5;

        //background-color: $color-primary;
    }

    .md-layout-item {
        margin-left: 2%;
        margin-right: 2%;
    }

    #div_containing_cards {
        padding-top: 7%;
        padding-left: 2.5%;
        padding-right: 2.5%;
    }

    .div_film {
        width: 20%;

        margin-left: 2.5%;
        margin-right: 2.5%;
        margin-bottom: 5%;

        display: inline-table;
        vertical-align: middle;

        border-color: fade_out($color-secondary, 0.8);
        border-style: inset;
        border-width: 4px;
    }

    .card_film {
        display: table-cell;
        vertical-align: middle;
        height: 100%;
    }

    .div_card:hover {
        border-color: fade_out($color-secondary, 0.2);
    }

    .div_titre, .div_annee, #card_content_img {
        text-align: center;
    }

    .button_favourite {
        text-align: right;
    }
</style>