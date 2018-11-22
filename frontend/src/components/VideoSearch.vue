<template>
    <div class="search-box"
        ref="searchBox">
        <div class="video-search">
            <input  class="video-search-input"
                    type="text"
                    v-bind:value="searchQuery"
                    placeholder="ex: dragon_ball_z"
                    v-on:input="debouncedTypeAhead($event)">
            <button class="video-search-button"
                    v-on:click="conductSearch(searchQuery)"
                    ref="searchButton">S</button>
        </div>
        <div class="typeahead-results"
            v-show="searchBoxActive">
            <ul class="results-list"
                ref="resultsList">
                <li class="text-left"
                    v-for="result in typeAheadResults"
                    v-bind:key="result.id"
                    v-on:click="updateSearchParams(result.name)">{{ result.name }}</li>
            </ul>
        </div>
    </div>
</template>

<script>

import APIService from "../services/search.svc.js";
import PerformanceHelperService from "../services/performanceHelper.svc.js";
const api = new APIService();
const perf = new PerformanceHelperService();

export default {
  name: "VideoSearch",
  data: function () {
    return {
      searchQuery: "",
      timerId: null,
      typeAheadResults: [],
      baseResultString: "",
      currentSearchParam: "",
    };
  },
  methods: {
      conductSearch(query) {
          api.searchBooru(query.toLowerCase(), this.$mq)
            .then((response) => {
                this.$emit("update-data", response);
            });
        this.searchQuery = "";
        this.baseResultString = "";
        this.typeAheadResults = [];
        this.$emit("search-box-inactive");
      },
      debouncedTypeAhead($event){
          // Creates, and then uses the debounce function.
          this.searchQuery = $event.target.value;
          const query = this.updateCurrentSearchParamAndReturn().toLowerCase();
          const debounceFunc = perf.debounce(250, this.typeAheadSearch(query), this.timerId);
          this.timerId = debounceFunc();
      },
      typeAheadSearch(query) {
          return () => {
            if(query){
                api.getBooruTags(query)
                    .then((response) => {
                        this.typeAheadResults = response;
                    }, (error) => {
                        return error;
                    });
            } else{
                this.typeAheadResults = [];
                this.$emit("search-box-inactive");
            }
          };
      },
      updateSearchParams(resultName) {
          if(this.baseResultString === ""){
            this.baseResultString += resultName;
          } else {
            this.baseResultString += ` ${resultName}`;
          }

          this.searchQuery = this.baseResultString;
            this.$emit("search-box-inactive");
      },
      updateCurrentSearchParamAndReturn(){
          this.currentSearchParam = this.searchQuery
                                    .replace(this.baseResultString, "")
                                    .trim();

          return this.currentSearchParam;
      }
  },
  props: {
      searchBoxActive: Boolean,
  },
  mounted() {
      this.$emit("search-box-mounted", this.$refs);
  }
};

</script>

<style scoped>
    .search-box{
        position: fixed;
        top:0;
        left:0;
        width: 100%;
        padding: 20px 0px 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: white;
        z-index: 1;
    }

    .video-search{
        width: 90%;
        display: flex;
        justify-content: space-between;
    }

    .video-search-input{
        width: 70%;
        border-radius: 5px;
        height: 1.5em;
    }

    .video-search-button{
        width: 20%;
    }

    .typeahead-results{
        display: flex;
        justify-content: flex-start;
        width: 100%;
    }

    .typeahead-results .results-list{
        list-style: none;
        padding: 0 5%;
        margin: 0;
    }

    .text-left {
        text-align: left;
    }
</style>