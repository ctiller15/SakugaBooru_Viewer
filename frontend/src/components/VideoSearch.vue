<template>
    <div class="search-box"
        ref="searchBox">
        <div class="video-search">
            <input  v-model="searchQuery"
                    type="text"
                    v-on:input="debouncedTypeAhead(searchQuery)">
            <button v-on:click="conductSearch(searchQuery)">Search!</button>
        </div>
        <div class="typeahead-results"
            v-if="searchBoxActive">
            <ul>
                <li v-for="result in typeAheadResults"
                    v-bind:key="result.id">{{ result.name }}</li>
            </ul>
        </div>
    </div>
</template>

<script>

import APIService from '../services/search.svc.js';
import PerformanceHelperService from '../services/performanceHelper.svc.js';
const api = new APIService();
const perf = new PerformanceHelperService();

export default {
  name: 'VideoSearch',
  data: function () {
    return {
      searchQuery: "",
      timerId: null,
      typeAheadResults: []
    }
  },
  methods: {
      conductSearch(query) {
          api.searchBooru(query)
            .then((response) => {
                this.$emit("update-data", response);
            });
      },
      debouncedTypeAhead(query){
          // Creates, and then uses the debounce function.
          const debounceFunc = perf.debounce(500, this.typeAheadSearch(query), this.timerId);
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
                        //console.log(error);
                    });
            } else{
                this.$emit("search-box-inactive");
            }
          }
      }
  },
  props: {
      searchBoxActive: Boolean,
  },
  mounted() {
      this.$emit("search-box-mounted", this.$refs["searchBox"]);
  }
}

</script>