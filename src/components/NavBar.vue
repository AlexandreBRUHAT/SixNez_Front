<template>
    <div id="navbar" class="page-container md-layout-column">
        <md-toolbar class="md-primary">
            <div class="md-toolbar-row">
                <div class="md-toolbar-section-start" @click="navigate('/')">
                    <span class="md-title">Six Nez</span>
                </div>

                <div class="md-toolbar-section-end">
                    <md-button class="md-accent" @click="navigate('/login')" v-if="!connected">
                        Login
                    </md-button>
                    <md-button @click="navigate('/signin')" v-if="!connected">
                        Sign In
                    </md-button>
                    <md-button @click="disconnect()" v-if="connected">
                        Sign Out
                    </md-button>
                </div>
            </div>

            <div class="md-toolbar-row" v-if="connected">
                <md-tabs class="md-primary">
                    <md-tab id="tab-home" md-label="Accueil" @click="navigate('/')"></md-tab>
                    <md-tab id="tab-films" md-label="Films" @click="navigate('/films')"></md-tab>
                    <md-tab id="tab-acteurs" md-label="Acteurs" @click="navigate('/acteurs')"></md-tab>
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
            navigate(route) {
                if (route != this.$router.currentRoute.path)
                    this.$router.push(route)
            },
            connected() {
                return window.localStorage != null && window.localStorage.getItem('token') != null
            },
            disconnect() {
                window.localStorage.removeItem('token')
            }
        }
    }
</script>

<style scoped>
    @import "../styles/navbar.scss";
</style>