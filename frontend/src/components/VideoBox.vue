
<template>
    <div class="video-box" >
        <div v-if="!videoData.videoActive">
            <img v-bind:src="videoData['preview_url']">
        </div>
        <div v-else>
            <VideoModal v-bind:videoDataUrl="videoData['file_url']"
                        v-bind:videoTags="videoData['videoTags']"></VideoModal>
        </div>

    </div>
</template>

<script>
import VideoModal from './VideoModal.vue';

export default {
  name: 'Videobox',
  components: {
      VideoModal
  },
  data: function () {
    return {
      play_video: false,
    }
  },
  props: {
    videoData: Object
  }
}

</script>