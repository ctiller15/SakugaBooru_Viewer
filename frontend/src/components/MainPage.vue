<template >
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="video-images"></div>
    <VideoSearch v-on:update-data="searchData = $event"></VideoSearch>
    <ul>
      <li v-for="item in searchData"
          v-bind:key="item.id"
          v-on:click="updateVideoActive(searchData, item.id)">
        <VideoBox v-bind:videoData="item">"</VideoBox>
      </li>
    </ul>
  </div>
</template>

<script>
import APIService from '../services/search.svc.js';
import VideoBox from '../components/VideoBox.vue';
import VideoSearch from '../components/VideoSearch.vue';

const api = new APIService();

export default {
  name: 'HelloWorld',
  components: {
    VideoBox,
    VideoSearch,
  },
  data: function () {
    return {
      searchData: [],
    }
  },
  props: {
    msg: String
  },
  methods: {
    updateVideoActive(data, ind){
      const updatedVideoActivity = data.map((m) => {
                                      if(m.id === ind){
                                        m.videoActive = true;
                                      } else {
                                        m.videoActive = false;
                                      }
                                      return m;
                                    });

      this.searchData = updatedVideoActivity;
    },
    updateSearchResult() {
      console.log("HA! I WORK!");
      //console.log(data);
    }
  },
  created () {
      api.getTodos()
      .then((response) => {
          this.searchData = response
                            .map((m) => {
                                m.videoActive = false;
                                return m;
                              });
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
