
<template>
    <div class="video-modal">
        <video class="animated-video" 
                controls
                loop
                preload="auto">
            <source v-bind:src="videoDataUrl" 
                    type="video/mp4">
        </video>
        <div class="video-info">
            <div class="video-tags">
                <p v-on:click="tagDisplayToggle()">
                    <span v-if="tagListActive">Hide</span>
                    <span v-else>Show</span> 
                    tags
                </p>
                <ul class="tag-list"
                    v-show="tagListActive">
                    <!-- If a tag is clicked,
                    Add it to the taglist. -->
                    <li class="tag-list-item"
                        v-for="tag in videoTags"
                        v-bind:key="tag">{{ tag }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: "VideoModal",
  data: function () {
    return {
        tagListActive: false,
    };
  },
  props: {
    videoDataUrl: String,
    videoTags: Array,
  },
  methods: {
      tagDisplayToggle() {
          this.tagListActive = !this.tagListActive;
      }
  }
};

</script>

<style scoped>
    .video-modal{
        align-self: center;
    }

    .animated-video{
        max-width: 100%;
    }

    .tag-list {
        list-style: none;
        padding: 0;
        margin: 0;
        text-align: left;
    }

    .tag-list-item {
        text-align: left;
        display: inline-block;
        margin: 0 5px;
    }
</style>