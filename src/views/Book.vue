<template>
  <div class="home">
    <BookList v-bind:items="items"/>
  </div>
</template>

<script>
// @ is an alias to /src
import BookList from '@/components/BookList.vue'
import helpers from '../helpers.js';
// import AppVue from '../App.vue';

// import axios from 'axios'
export default {
  name: 'Book',
  components: {
    BookList
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
    
    
  },
  created() {
    if (!this.loaded) {
      helpers.makeRequest("books", "get").then(res => {
        this.items = res.data
        this.loaded = true;
      })
    }
  }

}
</script>
