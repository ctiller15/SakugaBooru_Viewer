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
                <img  class="preview-image"
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