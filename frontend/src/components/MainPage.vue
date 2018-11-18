<template>
  <div v-on:click="checkPageClick($event)">
    <VideoSearch v-on:update-data="updateSearchData($event)"
                 v-on:search-box-mounted="initializeRefs($event)"
                 v-bind:searchBoxActive="searchBoxActive"></VideoSearch>
    <ul class="video-search-results"
        v-if="searchDataPage.length > 0">
      <li v-for="item in searchDataPage"
          v-bind:key="item.id"
          v-on:click="updateVideoActive(searchDataPage, item.id)">
        <VideoBox v-bind:videoData="item"></VideoBox>
      </li>
    </ul>
    <div v-else>
      Couldn't find anything! Try another search?
    </div>
    <FooterSection v-bind:searchDataLength="searchData.length"
                   v-on:page-updated="updatePage($event)"></FooterSection>
  </div>
</template>

<script>
import APIService from "../services/search.svc.js";
import VideoBox from "../components/VideoBox.vue";
import VideoSearch from "../components/VideoSearch.vue";
import FooterSection from "../components/FooterSection.vue";

const api = new APIService();

export default {
  name: "HelloWorld",
  components: {
    VideoBox,
    VideoSearch,
    FooterSection,
  },
  data: function () {
    return {
      searchDataPage: [],
      searchData: [],
      searchBoxElement: null,
      searchBoxButton: null,
      searchBoxResults: null,
      searchBoxActive: false,
    };
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

      this.searchDataPage = updatedVideoActivity;
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
    },
    defaultSearch(){
      return api.searchBooru()
        .then((response) => {
            this.searchData = response;
            this.searchDataPage = response[0];
        });
    },
    updateSearchData($event){
      this.searchData = $event;
      this.searchDataPage = $event[0];
    },
    updatePage($event){
      console.log($event);
      this.searchDataPage = this.searchData[$event];
    }
  },
  created () {
      this.defaultSearch();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.video-search-results {
  width: 100%;
  margin: 70px 0px 0px;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  width: 100%;
}
a {
  color: #42b983;
}
</style>
