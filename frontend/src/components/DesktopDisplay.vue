<template>
    <div class="desktop-display">
        <div class="desktop-video-wrapper">
          <div class="main-video-desktop">
              <video  class="active-video-desktop"
                      v-bind:src="activeVideo['file_url']"
                      controls
                      ref="desktopVideo"></video>
          </div>
          <div class="video-info-desktop">
                <p  class="tag-toggle-button"
                    v-on:click="tagDisplayToggle()">
                    <span v-if="tagListActive">Hide</span>
                    <span v-else>Show</span> 
                    tags
                </p>
                <ul class="tag-list-desktop"
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

</template>

<script>
    export default {
        name: "DesktopDisplay",
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
    .desktop-display {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin: 66px 0 66px;
        height: 80vh;
    }

    .desktop-video-wrapper {
        margin: 0 20px;
        width: 67%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }

    .main-video-desktop {
        height: 80%;
        display: flex;
        justify-content: center;
    }

    .active-video-desktop {
        height: 100%;
    }

    .desktop-video-icons-container{
        width: 33%;
        height: 100%;
        overflow-y: scroll;
    }

    .video-info-desktop{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .tag-toggle-button {
        margin: 0;
        padding: 10px;
    }

    .tag-list-desktop {
        list-style: none;
        display: flex;
        padding: 0;
        width: 80%;
    }

    .tag-list-item {
        display: inline-block;
        padding: 10px;
    }

    .desktop-video-icons{
        list-style: none;
    }
</style>