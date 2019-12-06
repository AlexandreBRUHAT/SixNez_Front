<template>
    <div>
        <SpinnerLoader v-if="isLoading" />

        <div id="div_containing_cards" v-if="!isLoading">
            <FilmCard v-for="film in favoris" v-bind:key="film.id" :film="film" />
        </div>
    </div>
</template>

<script>
    import SpinnerLoader from "./SpinnerLoader";
    import SixNezService from "../SixNezService";
    import FilmCard from "./FilmCard";

    const PAGE_SIZE = 8;

    export default {
        name: "Favoris",
        components: {FilmCard, SpinnerLoader},
        async mounted () {
            this.updatePage();

            this.$bus.$on("removeFavourite", (film) => {
                this.favoris.splice(this.favoris.indexOf(film), 1);
            })
        },
        data: () => ({
            favoris: null,
            nextFavori: null,
            currentPage: 0,
            isLoading: false
        }),
        methods: {
            async updatePage() {
                this.isLoading = true;
                this.nextFavori = null;

                this.favoris = await SixNezService.getFavourites(this.currentPage, PAGE_SIZE);
                this.nextFavori = await SixNezService.getFavourites((this.currentPage + 1) * PAGE_SIZE, 1);

                let ids = [];
                this.favoris.forEach(film => {
                    ids.push({ id: film.id });
                });

                SixNezService.getPictures(ids).then(pictures => {
                    pictures.forEach(picture => {
                        this.favoris.forEach(film => {
                            if (film.id == picture.id) {
                                film.imgURL = picture.imgURL;
                            }
                        });
                    })
                });

                this.isLoading = false;
            }
        }
    }
</script>

<style scoped lang="scss">

    #div_containing_cards {
        padding-top: 2%;
        padding-left: 2.5%;
        padding-right: 2.5%;
    }

</style>