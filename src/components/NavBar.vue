<template>
    <div id="navbar" class="page-container md-layout-column">
        <md-toolbar class="md-primary">
            <div class="md-toolbar-row">
                <div class="md-toolbar-section-start">
                    <span class="md-title">Six Nez</span>
                </div>

                <div class="md-toolbar-section-end">
                    <md-button class="md-icon-button">
                        <md-icon>more_vert</md-icon>
                    </md-button>
                </div>
            </div>

            <div class="md-toolbar-row">
                <md-tabs class="md-primary">
                    <md-tab id="tab-home" md-label="Accueil"></md-tab>
                    <md-tab id="tab-pages" md-label="Films"></md-tab>
                    <md-tab id="tab-posts" md-label="Posts"></md-tab>
                    <md-tab id="tab-favorites" md-label="Favorites"></md-tab>
                </md-tabs>
            </div>
        </md-toolbar>
    </div>
</template>

<script>
    export default {
        name: "NavBar",
        data: () => ({
        }),
        methods: {
        }
    }
</script>

<style scoped>
    @import "../styles/navbar.scss";
</style>