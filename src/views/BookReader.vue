<template>
  <div style="height: 100%; overflow: hidden;">
      <cbz-viewer v-if="bookType == 'cbz'" :id="this.id" :entries="entries" :book="this.book" :progress="progress"></cbz-viewer>
      <epub-viewer v-if="bookType == 'epub'" :id="this.id" :book="book"></epub-viewer>
  </div>
</template>

<script>
import CbzViewer from '../components/CbzViewer.vue'
import EpubViewer from '../components/EpubViewer.vue'
import helpers from '../helpers';

export default {
  components: { CbzViewer, EpubViewer },
  name: "MangaViewer",
  mounted() {
    this.$root.$emit('resourceLoader', true)
    helpers.makeRequest("books/"+this.id, "get").then((res) => {
      let book = res.data
      this.book = book;
      this.bookType = book.fileExtension
    })
  },
  created() {
    this.id = this.$route.params.id
  },
  data() {
    return {
      id: null,
      book: null,
      bookType: "",
      entries: [],
      progress: 0
    }
  }

}
</script>

<style>

</style>