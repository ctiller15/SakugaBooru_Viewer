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
  components: {
      //VideoModal
  },
  data: function () {
    return {
      searchQuery: ""
    }
  },
  props: {
    // searchData: {
    //     type: Array,
    //     default: () => []
    // }
  },
  methods: {
    //   init() {
    //       console.log(this.searchData);
    //   },
      conductSearch(query) {
          console.log(`Searching on ${query}!`);
          api.searchBooru(query)
            .then((response) => {
                console.log(response);
                this.$emit('update-data', response);
            });
      }
  },
  mounted() {
      //this.init();
  }
}

</script>