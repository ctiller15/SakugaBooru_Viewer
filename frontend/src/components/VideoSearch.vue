<template>
    <div class="video-search">
        <input v-model="searchQuery"
                type="text">
        <button v-on:click="conductSearch(searchQuery)">Search!</button>
    </div>
</template>

<script>

import APIService from '../services/search.svc.js';
const api = new APIService();

export default {
  name: 'VideoSearch',
  data: function () {
    return {
      searchQuery: ""
    }
  },
  methods: {
      conductSearch(query) {
          api.searchBooru(query)
            .then((response) => {
                this.$emit('update-data', response);
            });
      }
  }
}

</script>