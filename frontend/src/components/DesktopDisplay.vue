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