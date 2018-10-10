
<template>
    <div class="video-box" 
         v-on:click="play_video = true">
        <div v-if="!play_video">
            <img v-bind:src="videoData['preview_url']">
        </div>
        <div v-else>
            <video controls>
                <source v-bind:src="videoData['jpeg_url']" type="video/mp4">
            </video>
        </div>

    </div>
</template>

<script>

export default {
  name: 'Videobox',
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