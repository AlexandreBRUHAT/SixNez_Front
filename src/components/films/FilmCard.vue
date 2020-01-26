<template>
    <div class="div_film" @click="$router.push({ name: 'film', params: { id: film.id }})">
        <md-card md-with-hover class="card_film">
            <md-ripple>
                <div class="button_favourite">
                    <md-button class="md-icon-button md-list-action" @click="favourite($event, film.id)">
                        <md-icon class="etoile" v-if="film.fav">star</md-icon> <!-- TODO -->
                        <md-icon class="etoile" v-if="!film.fav">star_border</md-icon>
                    </md-button>
                </div>

                <md-card-header>
                    <md-content class="md-title div_titre">{{ film.name }}</md-content>
                    <md-content class="md-subhead div_annee">{{ film.annee }}</md-content>
                </md-card-header>

                <md-card-content id="card_content_img">
                    <md-progress-spinner class="md-accent" :md-diameter="80" :md-stroke="8" md-mode="indeterminate" v-if="film.imgURL == null" />
                    <img v-bind:src="film.imgURL" v-if="film.imgURL != null && film.imgURL != ''">
                    <img src="../../assets/no_img.png" v-if="film.imgURL != null && film.imgURL == ''">
                </md-card-content>
            </md-ripple>
        </md-card>

        <md-snackbar md-position="center" :md-duration="Infinity" :md-active.sync="showSnackbar">
            <span>Supprimer des favoris ?</span>
            <div>
                <md-button class="md-accent" @click="removeFavourite(film.id)">Oui</md-button>
                <md-button class="md-accent" @click="showSnackbar = false">Non</md-button>
            </div>
        </md-snackbar>
    </div>
</template>

<script>
    import SixNezService from "../../services/SixNezService";
    import Vue from 'vue';

    export default {
        name: "FilmCard",
        props: {
            film: {
                type: Object,
                required: true
            }
        },
        data: () => ({
           showSnackbar: false
        }),
        methods: {
            favourite(event, id) {
                event.stopPropagation();

                if (this.film.fav) {
                    this.showSnackbar = true;
                } else {
                    SixNezService.addFavourite(id);
                    this.film.fav = true;
                }
            },

            removeFavourite(id) {
                this.showSnackbar = false;

                SixNezService.removeFavourite(id);
                this.film.fav = false;

                Vue.prototype.$bus.$emit("removeFavourite", this.film);
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../styles/global";

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

    .etoile {
        color: #f8a412 !important;
    }

</style>