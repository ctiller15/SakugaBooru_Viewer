<template>
  <div v-on:click="checkPageClick($event)">
    <VideoSearch v-on:update-data="updateSearchData($event)"
                 v-on:search-box-mounted="initializeRefs($event)"
                 v-bind:searchBoxActive="searchBoxActive"></VideoSearch>
    <div v-if="$mq === 'mobile'">
      <MobileDisplay v-bind:searchDataPage="searchDataPage"
                     v-on:video-updated="updateVideoActive($event)"></MobileDisplay>
      <!-- <ul class="video-search-results"
          v-if="searchDataPage.length > 0">
        <li v-for="item in searchDataPage"
            v-bind:key="item.id"
            v-on:click="updateVideoActive(searchDataPage, item.id)">
          <VideoBox v-bind:videoData="item"></VideoBox>
        </li>
      </ul>
      <div v-else>
        Couldn't find anything! Try another search?
      </div> -->
    </div>

    <div v-else-if="$mq === 'tablet'"
         class="tablet-display">
      <div class="video-wrapper">
        <div class="main-video">
          <video  class="active-video"
                  v-bind:src="activeVideo['file_url']"
                  controls
                  ref="tabletVideo"></video>
        </div>
          <div class="video-info">
            <div class="video-tags">
                <p v-on:click="tagDisplayToggle()">
                    <span v-if="tagListActive">Hide</span>
                    <span v-else>Show</span> 
                    tags
                </p>
                <ul class="tag-list-tablet"
                    v-show="tagListActive">
                    <!-- If a tag is clicked,
                    Add it to the taglist. -->
                    <li class="tag-list-item"
                        v-for="tag in activeVideo['videoTags']"
                        v-bind:key="tag">{{ tag }}</li>
                </ul>
            </div>
          </div>
      </div>
      <ul class="tablet-video-icons">
        <li class="tablet-video-icon"
            v-bind:key="item.id"
            v-for="(item, index) in searchDataPage"
            v-on:click="updateMainVideo(searchDataPage, index)">
            <div class="tablet-image-box">
              <img  class="preview-image"
                    v-bind:src="item['preview_url']">
            </div>
        </li>
      </ul>
    </div>

    <div v-else-if="$mq === 'desktop'"
          class="desktop-display">
        <div class="desktop-video-wrapper">
          <div class="main-video-desktop">
              <video  class="active-video-desktop"
                      v-bind:src="activeVideo['file_url']"
                      controls
                      ref="desktopVideo"></video>
          </div>
          <div class="video-info-desktop">
                <p v-on:click="tagDisplayToggle()">
                    <span v-if="tagListActive">Hide</span>
                    <span v-else>Show</span> 
                    tags
                </p>
                <ul class="tag-list-tablet"
                    v-show="tagListActive">
                    <li class="tag-list-item"
                        v-for="tag in activeVideo['videoTags']"
                        v-bind:key="tag">{{ tag }}</li>
                </ul>
          </div>

        </div>
        <div class="desktop-video-icons-container">
          <ul class="desktop-video-icons">
            <li class="desktop-video-icon"
                v-bind:key="item.id"
                v-for="(item, index) in searchDataPage"
                v-on:click="updateMainVideo(searchDataPage, index)">
              <div class="desktop-image-box">
                <img class="desktop-preview-image"
                    v-bind:src="item['preview_url']">
              </div>
            </li>
          </ul>
        </div>
    </div>

    <FooterSection v-bind:searchDataLength="searchData.length"
                   v-bind:selectedPage="selectedPage"
                   v-on:page-updated="updatePage($event)"></FooterSection>
  </div>
</template>

<script>
import APIService from "../services/search.svc.js";
import MobileDisplay from "../components/MobileDisplay.vue";
import VideoBox from "../components/VideoBox.vue";
import VideoSearch from "../components/VideoSearch.vue";
import FooterSection from "../components/FooterSection.vue";

const api = new APIService();

export default {
  name: "HelloWorld",
  components: {
    MobileDisplay,
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
    updateMainVideo(pageData, index){
      this.activeVideo = pageData[index];
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
.desktop-display {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 66px 0 66px;
  height: 80vh;
}

.video-search-results {
  width: 100%;
  margin: 70px 0px 70px;
}

.tablet-display {
  width: 100%;
  margin: 70px 0px 70px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.tablet-video-icons {
  margin: 500px 0px 0px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}

.tablet-video-icon {
  margin-top: 1em;
  flex-basis: 200px;
}

.video-wrapper {
  top: 66px;
  background: gray;
  height: 500px;
  width: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 10px 0;
}

.desktop-video-wrapper {
  width: 67%;
  display: flex;
  flex-direction: column;
}

.main-video-desktop {
  height: 80%;
  display: flex;
  justify-content: center;
}

.desktop-video-icons-container{
  width: 33%;
  height: 100%;
  overflow-y: scroll;
}

.active-video-desktop {
  height: 100%;
}

.main-video{
  top: 66px;
  min-width: 80%;
  max-width: 768px;
  max-height: 500px;
  align-self: center;
}

.tag-list-tablet {
  display: flex;
}

.video-tags {
  margin-top: 30px;
}

.main-video > * {
  max-height: 400px;
}

.active-video {
  max-width: 100%;
  height: 400px;
}

.preview-image {
  width: 100%;
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
