<template>
    <div class="video-search">
        <input  v-model="searchQuery"
                type="text"
                v-on:input="debouncedTypeAhead(searchQuery)">
        <button v-on:click="conductSearch(searchQuery)">Search!</button>
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
    }
  },
  methods: {
      conductSearch(query) {
          api.searchBooru(query)
            .then((response) => {
                this.$emit('update-data', response);
            });
      },
      debouncedTypeAhead(query){
          // Creates, and then uses the debounce function.
          const debounceFunc = perf.debounce(500, this.typeAheadSearch(query), this.timerId);
          this.timerId = debounceFunc();
      },
      typeAheadSearch(query) {
          return () => {
            console.log(query);
          }

      }
  }
}

</script>