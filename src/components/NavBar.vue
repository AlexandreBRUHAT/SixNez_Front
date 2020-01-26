<template>
    <div id="navbar" class="page-container md-layout-column">
        <md-toolbar class="md-primary">
            <div class="md-toolbar-row">
                <div class="md-toolbar-section-start" to="/home">
                    <span class="md-title">Six Nez</span>
                </div>

                <div class="md-toolbar-section-end">
                    <md-button to="/login" v-if="!isConnected">
                        Se connecter
                    </md-button>

                    <md-button to="/register" v-if="!isConnected">
                        Créer un compte
                    </md-button>

                    <!-- le "to" sans rien evite un warning, mais il est inutil ici -->
                    <md-button @click="disconnect" to v-if="isConnected">
                        Se déconnecter
                        <i class="material-icons" id="icon_deconnexion">exit_to_app</i>
                    </md-button>
                </div>
            </div>

            <div class="md-toolbar-row" v-if="isConnected">
                <md-tabs class="md-primary" md-sync-route>
                    <md-tab md-label="Accueil" class="md-accent" to="/home" exact/>
                    <md-tab md-label="Films" class="md-accent" to="/films" />
                    <md-tab md-label="Acteurs" class="md-accent" to="/acteurs" />
                    <md-tab md-label="Favoris" class="md-accent" to="/favoris" />
                </md-tabs>
            </div>
        </md-toolbar>
    </div>
</template>

<script>
    import SixNezService from "../services/SixNezService";

    export default {
        name: "NavBar",
        data: () => ({
            isConnected: SixNezService.hasToken()
        }),
        async mounted () {
            this.$bus.$on("connected", () => {
                this.isConnected = true;
            });

            this.$bus.$on("disconnected", () => {
                this.isConnected = false;
            });

            if (!await SixNezService.forceCheckToken()) {
                this.isConnected = false;
            }
        },
        methods: {
            disconnect () {
                SixNezService.disconnect();

                if (this.$router.currentRoute.fullPath != "/home") this.$router.push("/home");
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../styles/navbar.scss";

    #navbar {
        position: sticky;
        top: 0px;
        z-index: 10;
    }

    #icon_deconnexion {
        vertical-align: middle;
    }
</style>