<template>
    <div>
        <md-toolbar id="toolbar_filters" class="md-layout md-gutter md-alignment-center md-primary">
            <md-button id="bouton_precedent" @click="currentPage--" :style="{visibility: this.currentPage == 0 ? 'hidden' : 'visible'}" class="md-layout-item">
                Précédent
            </md-button>

            <md-field id="field_category" class="md-layout-item">
                <label>Métier</label>
                <md-select v-model="job" id="select_category">
                    <md-option value="none">Tous</md-option>

                    <md-option v-for="j in jobs" :key="j" :value="j">{{ translateJob(j) }}</md-option>
                </md-select>
            </md-field>

            <md-button id="bouton_suivant" @click="currentPage++" :style="{visibility: nextActor != null ? 'visible' : 'hidden'}" class="md-layout-item">
                Suivant
            </md-button>
        </md-toolbar>

        <SpinnerLoader v-if="isLoading" />

        <div v-if="!isLoading" id="div_acteurs">
            <div v-for="acteur in acteurs" :key="acteur.id" class="div_acteur" @click="$router.push({ name: 'acteur', params: { id: acteur.id }})">
                <md-card class="md-accent" md-with-hover>
                    <md-ripple>
                        <md-content class="md-accent content_acteur">{{ acteur.nomPrenom }}</md-content>
                    </md-ripple>
                </md-card>
            </div>
        </div>
    </div>
</template>

<script>
    import SpinnerLoader from "./SpinnerLoader";
    import SixNezService from "../SixNezService";
    import TraductionService from "../TraductionService";

    const PAGE_SIZE = 42;

    export default {
        name: "Acteurs",
        components: {SpinnerLoader},
        async mounted () {
            this.updatePage();

            this.jobs = await SixNezService.getMetiers();
        },
        data: () => ({
            acteurs: null,
            jobs: [],
            job: null,
            currentPage: 0,
            isLoading: false,
            nextActor: null
        }),
        methods: {
            async updatePage() {
                this.isLoading = true;
                this.nextActor = null;

                this.acteurs = await SixNezService.getActors(this.currentPage, PAGE_SIZE, this.job);
                this.nextActor = await SixNezService.getActors((this.currentPage + 1) * PAGE_SIZE, 1, this.job);

                this.isLoading = false;
            },

            translateJob(job) {
                return TraductionService.translateJobs(job);
            }
        },
        watch: {
            currentPage: async function () {
                this.updatePage();
            },

            job: function () {
                if (this.job === "none") {
                    this.job = null;
                }

                if (this.currentPage == 0) this.updatePage();
                else this.currentPage = 0;
            }
        }
    }
</script>

<style scoped lang="scss">

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

    #div_acteurs {
        width: 80%;

        margin: 2% 10%;
        text-align: center;
        display: inline-block;
        padding-top: 6ch;
    }

    .div_acteur {
        width: 30%;
        display: inline-block;

        margin-left: 1%;
        margin-right: 1%;
    }

    .content_acteur {
        padding-top: 3%;
        padding-bottom: 3%;
    }

</style>