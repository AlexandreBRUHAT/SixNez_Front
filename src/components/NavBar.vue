<template>
    <div id="navbar" class="page-container md-layout-column">
        <md-toolbar class="md-primary">
            <div class="md-toolbar-row">
                <div class="md-toolbar-section-start" to="/home">
                    <span class="md-title">Six Nez</span>
                </div>

                <div class="md-toolbar-section-end">
                    <md-button class="md-accent" to="/login" v-if="!isConnected">
                        Se connecter
                    </md-button>

                    <md-button class="md-accent" to="/register" v-if="!isConnected">
                        Créer un compte
                    </md-button>

                    <!-- le "to" sans rien evite un warning, mais il est inutil ici -->
                    <md-button class="md-accent" @click="disconnect" to v-if="isConnected">
                        Se déconnecter
                        <i class="material-icons" id="icon_deconnexion">
                            exit_to_app
                        </i>
                    </md-button>
                </div>
            </div>

            <div class="md-toolbar-row" v-if="isConnected">
                <md-tabs class="md-primary" md-sync-route>
                    <md-tab id="tab-home" md-label="Accueil" class="md-accent" to="/home" exact/>
                    <md-tab id="tab-films" md-label="Films" class="md-accent" to="/films" />
                    <md-tab id="tab-acteurs" md-label="Acteurs" class="md-accent" to="/acteurs" />
                </md-tabs>
            </div>
        </md-toolbar>
    </div>
</template>

<script>
    import SixNezService from "../SixNezService";

    export default {
        name: "NavBar",
        data: () => ({
            isConnected: SixNezService.hasValidToken()
        }),
        created () {
            this.$bus.$on("connected", () => {
                this.isConnected = true;
            });

            this.$bus.$on("disconnected", () => {
                this.isConnected = false;
            })
        },
        methods: {
            disconnect () {
                SixNezService.disconnect();
                this.$router.push("/home");
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../styles/navbar.scss";

    #navbar {
        position: sticky;
        top: 0px;
        z-index: 1000;
    }

    #icon_deconnexion {
        vertical-align: middle;
    }
</style>