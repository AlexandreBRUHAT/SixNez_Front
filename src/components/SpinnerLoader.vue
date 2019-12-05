<template>
    <div id="div_chargement">
        <md-progress-spinner class="md-accent" :md-diameter="80" :md-stroke="8" md-mode="indeterminate" />
    </div>
</template>

<script>
    export default {
        name: "SpinnerLoader"
    }
</script>

<style scoped>

    #div_chargement {
        text-align: center;

        padding-top: 5%;
        width: 100%;
        margin: auto;
    }

</style>