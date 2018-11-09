
<template>
    <div class="video-search">
        <!-- <div v-if="!videoData.videoActive">
            <img v-bind:src="videoData['preview_url']">
        </div>
        <div v-else>
            <VideoModal v-bind:videoDataUrl="videoData['jpeg_url']"></VideoModal>
        </div> -->
        <input type="text">

    </div>
</template>

<script>
//import VideoModal from './VideoModal.vue';

export default {
  name: 'VideoSearch',
  components: {
      //VideoModal
  },
  data: function () {
    return {
      //play_video: false,
    }
  },
  props: {
    //videoData: Object
  }
}

</script>