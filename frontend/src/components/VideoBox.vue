
<template>
    <div class="video-box">
        <div v-if="!videoData.videoActive">
            <img    class="video-preview-image"
                    v-bind:src="videoData['preview_url']">
        </div>
        <div    class="video-container"
                v-else>
            <VideoModal class="video"
                        v-bind:videoDataUrl="videoData['file_url']"
                        v-bind:videoTags="videoData['videoTags']"></VideoModal>
        </div>

    </div>
</template>

<script>
import VideoModal from "./VideoModal.vue";

export default {
  name: "Videobox",
  components: {
      VideoModal
  },
  data: function () {
    return {
      play_video: false,
    };
  },
  props: {
    videoData: Object
  }
};

</script>

<style scoped>
    .video-preview-image{
        width: 90%;
    }

    .video-container{
        display: flex;
        justify-content: center;
    }

    .video{
        width: 90%;
    }

</style>