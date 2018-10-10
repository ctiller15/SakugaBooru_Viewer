<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="video-images"></div>
    <ul>
      <li v-for="item in searchData"
          v-bind:key="item.id">
        <VideoBox v-bind:videoData="item">"</VideoBox>
      </li>
    </ul>
  </div>
</template>

<script>
import APIService from '../services/search.svc.js';
import VideoBox from '../components/VideoBox.vue';

const api = new APIService();

console.log(api);

export default {
  name: 'HelloWorld',
  components: {
    VideoBox
  },
  data: function () {
    return {
      searchData: {},
    }
  },
  props: {
    msg: String
  },
  created () {
      api.getTodos()
      .then((response) => {
          this.searchData = response;
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
