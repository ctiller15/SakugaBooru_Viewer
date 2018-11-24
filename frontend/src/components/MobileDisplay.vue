<template>
    <div>
        <ul class="video-search-results"
            v-if="searchDataPage.length > 0">
            <li v-for="item in searchDataPage"
                v-bind:key="item.id"
                v-on:click="updateCurrentActiveVideo(searchDataPage, item.id)">
                <VideoBox v-bind:videoData="item"></VideoBox>
            </li>
        </ul>
      <div v-else>
        Couldn't find anything! Try another search?
      </div>
    </div>
</template>

<script>
import VideoBox from "../components/VideoBox.vue";

export default {
    name: "MobileDisplay",
    components: {
        VideoBox
    },
    props: {
        searchDataPage: Array,
    }, 
    methods: {
        updateCurrentActiveVideo(data, id){
            const newActiveVideo = {
                data: data,
                id: id
            };
            this.$emit("video-updated", newActiveVideo);
        }
    }
};
</script>

<style scoped>
    .video-search-results {
        width: 100%;
        margin: 70px 0px 70px;
        padding: 0;
        list-style: none;
    }
</style>
