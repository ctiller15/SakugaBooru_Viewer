<template>
    <div class="tablet-display">
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
                <img class="preview-image"
                        v-bind:src="item['preview_url']">
                </div>
            </li>
        </ul>
    </div>

</template>

<script>
    export default {
        name: "TabletDisplay",
        data: function() {
            return {
                tagListActive: false,
            };
        },
        props: {
            activeVideo: Object,
            searchDataPage: Array,
        }, 
        methods: {
            tagDisplayToggle() {
                this.tagListActive = !this.tagListActive;
            },
            updateMainVideo(searchDataPage, index) {
                const mainVidData = {
                    data: searchDataPage,
                    index: index,
                };
                this.$emit("main-video-updated", mainVidData);
            }
        }
    }; 

</script>

<style scoped>
    .tablet-display {
        width: 100%;
        margin: 70px 0px 70px;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
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

    .main-video{
        top: 66px;
        min-width: 80%;
        max-width: 768px;
        max-height: 500px;
        align-self: center;
    }

    .active-video {
        max-width: 100%;
        height: 400px;
    }

    .video-tags {
        margin-top: 30px;
    }

    .tag-list-tablet {
        list-style: none;
        display: flex;
    }

    .tablet-video-icons {
        list-style: none;
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

    .preview-image {
        width: 100%;
    }
</style>