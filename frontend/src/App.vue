<template>
  <div id="app">
    <MainPage msg="Welcome to the Sakugabooru viewer!"/>
  </div>
</template>

<script>
import MainPage from "./components/MainPage.vue";

export default {
  name: "app",
  components: {
    MainPage
  }
};
</script>

<style>
body{
  margin:0;
  background: #222222;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #EE7B5D;
}
</style>
