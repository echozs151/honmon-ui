<template>
  <div class="home">
    <form @submit.prevent="saveBook">
    <p>Edit</p>
    <v-text-field v-model="form.title" name="title" label="Title"></v-text-field>
    <v-file-input
      v-model="file"
      name="file"
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
      

      helpers.formDataRequest("books/new", {model: JSON.stringify(this.form), file: this.file})
      return;
      // helpers.uploadFile()
      // helpers.makeRequest("books/new", "post", {
      //   data: {
      //     title: "test"
      //   }
      // }).then(res => {
      //   this.items = res.data
      // })
    }
  },
  data() {
    return {
      items: [],
      form: {},
      file: null
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
