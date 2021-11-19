<template>
  <div style="height: 100%; overflow: hidden;">
      <cbz-viewer :id="this.id"></cbz-viewer>
  </div>
</template>

<script>
import CbzViewer from '../components/CbzViewer.vue'

export default {
  components: { CbzViewer },
  name: "MangaViewer",
  mounted() {
    

  },
  created() {
    this.id = this.$route.params.id
  },
  data() {
    return {
      id: null,
      book: null
    }
  }

}
</script>

<style>

</style>