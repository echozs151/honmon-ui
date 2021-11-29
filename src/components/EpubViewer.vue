<template>
  <div>
    <v-container>
        <div id="area"></div>
    </v-container>
  </div>
</template>

<script>
import epubjs from "epubjs"
import helpers from '../helpers';

export default {
    props: {
        book: {}
    },
    mounted() {
        let id = this.book.id
        this.$root.$emit('resourceLoader', false)
        console.log()
        let url = helpers.baseUrl(false)+"resource/book-preview/"+id+".epub"
        console.log(url)
        // let epubBook = epubjs("https://epubtest.org/books/Fundamental-Accessibility-Tests-Basic-Functionality-v1.0.0.epub");
        let epubBook = epubjs(url);
        var rendition = epubBook.renderTo("area", {width: "500px", height: "500px"});
        var displayed = rendition.display();
        displayed.then((res) => {
            console.log(res)

        })
    }
}
</script>

<style>

</style>