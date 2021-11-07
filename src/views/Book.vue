<template>
  <div class="home">
    <BookCardList v-bind:items="items"/>
  </div>
</template>

<script>
// @ is an alias to /src
import BookCardList from '@/components/BookCardList.vue'
import helpers from '../helpers.js';
// import AppVue from '../App.vue';

// import axios from 'axios'
export default {
  name: 'Book',
  components: {
    BookCardList
  },
  data() {
    return {
      items: [],
      loaded: false
    }
  },
  mounted() {
    // axios.get("http://localhost:8080/home").then((res) => {
    //   console.log(res)
    // })
    // this.makeRequest("http://localhost:8080/home", "GET")
    this.$root.$emit("pageLoader", true)
    if (!this.loaded) {
      helpers.makeRequest("books", "get").then(res => {
        let that = this;
        this.items = res.data.map((item) => {
          item.backgroundImg = that.$root.resourceUrl+'book-thumbnail/'+item.id
          return item
        })
        console.log(this.items)
        this.loaded = true;
        this.$root.$emit("pageLoader", false)
      })
    }
    
  },
  created() {
    
  }

}
</script>
