<template>
    <div class="div_film" @click="$router.push({ name: 'film', params: { id: film.id }})">
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
</template>

<script>
    export default {
        name: "FilmCard",
        props: {
            film: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../styles/global";

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