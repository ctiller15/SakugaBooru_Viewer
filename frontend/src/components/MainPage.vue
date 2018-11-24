<template>
  <div v-on:click="checkPageClick($event)">
    <VideoSearch v-on:update-data="updateSearchData($event)"
                 v-on:search-box-mounted="initializeRefs($event)"
                 v-bind:searchBoxActive="searchBoxActive"></VideoSearch>
    <div v-if="$mq === 'mobile'">
      <MobileDisplay v-bind:searchDataPage="searchDataPage"
                     v-on:video-updated="updateVideoActive($event)"></MobileDisplay>
    </div>

    <div v-else-if="$mq === 'tablet'">
      <TabletDisplay v-bind:activeVideo="activeVideo"
                     v-bind:searchDataPage="searchDataPage"
                     v-on:main-video-updated="updateMainVideo($event)"></TabletDisplay>
    </div>

    <div v-else-if="$mq === 'desktop'">
      <DesktopDisplay v-bind:activeVideo="activeVideo"
                      v-bind:searchDataPage="searchDataPage"
                      v-on:main-video-updated="updateMainVideo($event)"></DesktopDisplay>
    </div>

    <FooterSection v-bind:searchDataLength="searchData.length"
                   v-bind:selectedPage="selectedPage"
                   v-on:page-updated="updatePage($event)"></FooterSection>
  </div>
</template>

<script>
import APIService from "../services/search.svc.js";
import MobileDisplay from "../components/MobileDisplay.vue";
import TabletDisplay from "../components/TabletDisplay.vue";
import DesktopDisplay from "../components/DesktopDisplay.vue";
import VideoBox from "../components/VideoBox.vue";
import VideoSearch from "../components/VideoSearch.vue";
import FooterSection from "../components/FooterSection.vue";

const api = new APIService();

export default {
  name: "HelloWorld",
  components: {
    MobileDisplay,
    TabletDisplay,
    DesktopDisplay,
    VideoBox,
    VideoSearch,
    FooterSection,
  },
  data: function () {
    return {
      activeVideo: {},
      searchDataPage: [],
      searchData: [],
      searchBoxElement: null,
      searchBoxButton: null,
      searchBoxResults: null,
      searchBoxActive: false,
      selectedPage: 1,
      tagListActive: false,
    };
  },
  props: {
    msg: String
  },
  methods: {
    updateVideoActive($event){
      const data = $event.data;
      const id = $event.id;
      const updatedVideoActivity = data.map((m) => {
                                      m.videoActive = m.id === id;
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
      return api.searchBooru("", this.$mq)
        .then((response) => {
            this.searchData = response;
            this.searchDataPage = response[0];
            this.activeVideo = this.searchDataPage[0];
            this.activeVideo.videoActive = true;
        });
    },
    tagDisplayToggle() {
      this.tagListActive = !this.tagListActive;
    },
    updateSearchData($event){
      this.searchData = $event;
      this.searchDataPage = $event[0];
      this.selectedPage = 1;
      this.activeVideo = this.searchDataPage[0];
      this.activeVideo.videoActive = true;
    },
    updatePage($event){
      this.searchDataPage = this.searchData[$event];
      this.selectedPage = $event + 1;
      this.activeVideo = this.searchDataPage[0];
      this.activeVideo.videoActive = true;
    },
    updateMainVideo($event){
      const data = $event.data;
      const index = $event.index;
      this.activeVideo = data[index];
      this.activeVideo.videoActive = true;
    },
  },
  created () {
      this.defaultSearch();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.main-video > * {
  max-height: 400px;
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
