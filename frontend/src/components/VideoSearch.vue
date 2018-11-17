<template>
    <div class="search-box"
        ref="searchBox">
        <div class="video-search">
            <input  v-model="searchQuery"
                    type="text"
                    v-on:input="debouncedTypeAhead($event)">
            <button v-on:click="conductSearch(searchQuery)"
                    ref="searchButton">Search!</button>
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
import PerformanceHelperService from '../services/performanceHelper.svc.js';
const api = new APIService();
const perf = new PerformanceHelperService();

export default {
  name: 'VideoSearch',
  data: function () {
    return {
      searchQuery: "",
      timerId: null,
      typeAheadResults: [],
      baseResultString: "",
      currentSearchParam: "",
    }
  },
  methods: {
      conductSearch(query) {
          api.searchBooru(query)
            .then((response) => {
                this.$emit("update-data", response);
            });
        console.log("Broke it!");
        this.searchQuery = "";
        this.baseResultString = "";
        this.typeAheadResults = [];
        this.$emit("search-box-inactive");
      },
      debouncedTypeAhead(){
          // Creates, and then uses the debounce function.
          const query = this.updateCurrentSearchParamAndReturn();
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
          }
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
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.typeahead-results .results-list{
    list-style: none;
}

.text-left {
    text-align: left;
}
</style>