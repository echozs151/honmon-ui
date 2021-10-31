<template>
  <div class="home">
    <form @submit.prevent="saveBook()">
    <p>Edit</p>
    <v-text-field label="Title"></v-text-field>
    <v-file-input
      show-size
      truncate-length="50"
    ></v-file-input>
    <v-btn
      type="submit"
      elevation="2"
    >Save</v-btn>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
import helpers from '../helpers.js';
// import AppVue from '../App.vue';

// import axios from 'axios'
export default {
  name: 'AddBook',
  components: {
    
  },
  methods: {
    saveBook() {
      console.log('test save')
      helpers.makeRequest("books", "post", {
        data: {
          title: "test"
        }
      }).then(res => {
        this.items = res.data
      })
    }
  },
  data() {
    return {
      items: []
    }
  },
  mounted() {
    // axios.get("http://localhost:8080/home").then((res) => {
    //   console.log(res)
    // })
    // this.makeRequest("http://localhost:8080/home", "GET")

  }
}
</script>
