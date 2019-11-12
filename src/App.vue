<template>
  <div id="app">
    <NavBar></NavBar>
    <Core></Core>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import Core from "./components/Core";

export default {
  name: 'app',
  components: {
    Core,
    NavBar
  }
}
</script>

<style lang="scss">

  @import "styles/global";

</style>
