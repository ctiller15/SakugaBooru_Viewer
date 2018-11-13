<template>
  <div v-on:click="checkPageClick($event)">
    <h1>{{ msg }}</h1>
    <div class="video-images"></div>
    <VideoSearch v-on:update-data="searchData = $event"
                 v-on:search-box-mounted="initializeRefs($event)"
                 v-bind:searchBoxActive="searchBoxActive"></VideoSearch>
    <ul>
      <li v-for="item in searchData"
          v-bind:key="item.id"
          v-on:click="updateVideoActive(searchData, item.id)">
        <VideoBox v-bind:videoData="item"></VideoBox>
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
      searchBoxElement: null,
      searchBoxButton: null,
      searchBoxResults: null,
      searchBoxActive: false,
    }
  },
  props: {
    msg: String
  },
  methods: {
    updateVideoActive(data, ind){
      const updatedVideoActivity = data.map((m) => {
                                      m.videoActive = m.id === ind;
                                      m.videoTags = m.tags.split(" ");
                                      return m;
                                    });

      this.searchData = updatedVideoActivity;
    },
    checkPageClick($event){
      const searchBoxClicked = $event.path.includes(this.searchBoxElement);
      const searchBoxButtonClicked = $event.path.includes(this.searchBoxButton);
      const searchBoxResultsClicked = $event.path.includes(this.searchBoxResults);
      this.searchBoxActive = searchBoxClicked && !(searchBoxButtonClicked || searchBoxResultsClicked);
    },
    initializeRefs($event){
      this.searchBoxElement = $event["searchBox"];
      this.searchBoxButton = $event["searchButton"];
      this.searchBoxResults = $event["resultsList"];
    }
  },
  created () {
      api.searchBooru()
      .then((response) => {
          this.searchData = response
                            .map((m) => {
                                m.videoActive = false;
                                m.videoTags = m.tags.split(" ");
                                console.log(m.videoTags);
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
