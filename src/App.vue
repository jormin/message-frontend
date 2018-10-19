<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
  import Index from './components/Index'

export default {
  name: 'app',
  components: {
    Index,
  }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    padding: 20px;
    padding-bottom: 0;
}
body{
  background-color: #fff !important;
  padding: 0 !important;
  margin: 0 !important;
}
</style>
