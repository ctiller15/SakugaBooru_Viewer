
<template>
    <div class="video-modal">
        <video class="animated-video" controls>
            <source v-bind:src="videoDataUrl" 
                    type="video/mp4">
        </video>
    </div>
</template>

<script>

export default {
  name: 'VideoModal',
  data: function () {
    return {
    }
  },
  props: {
    videoDataUrl: String
  }
}

</script>

<style scoped>
    .animated-video{
        max-width: 100%;
    }
</style>