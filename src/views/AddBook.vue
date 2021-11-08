<template>
  <div class="home">
    <v-card class="px-8 py-8">
    <form @submit.prevent="saveBook">
    <v-text-field prepend-icon="mdi-book-open" v-model="form.title" name="title" label="Title" ></v-text-field>
    <v-text-field prepend-icon="mdi-human" v-model="form.author" name="author" label="Author"></v-text-field>

    <v-combobox
    v-model="tags"
    :items="items"
    chips
    clearable
    label="Tags"
    multiple
    prepend-icon="mdi-link"
    
    >
      <template v-slot:selection="{ attrs, item, select, selected }">
        <v-chip
          v-bind="attrs"
          :input-value="selected"
          close
          @click="select"
          @click:close="remove(item, 'tags')"
        >
          <strong>{{ item }}</strong>&nbsp;
          <span>(interest)</span>
        </v-chip>
      </template>
    </v-combobox>

    <v-combobox
    v-model="category"
    :items="items"
    chips
    clearable
    label="Category"
    prepend-icon="mdi-shape"
    >
      <template v-slot:selection="{ attrs, item, select, selected }">
        <v-chip
          v-bind="attrs"
          :input-value="selected"
          close
          @click="select"
          @click:close="remove(item, 'category')"
        >
          <strong>{{ item }}</strong>&nbsp;
          <span>(interest)</span>
        </v-chip>
      </template>
    </v-combobox>


    <v-file-input
      v-model="file"
      name="file"
      show-size
      truncate-length="50"
      label="Book File"
    ></v-file-input>

    <v-file-input
      v-model="thumbnail"
      name="thumbnail"
      show-size
      truncate-length="50"
      label="Thumbnail"
    ></v-file-input>

    <v-container fluid>
      <v-textarea
        name="description"
        v-model="description"
        label="Description"
      ></v-textarea>
    </v-container>

    <v-btn
      type="submit"
      elevation="2"
    >Save</v-btn>
    </form>
    </v-card>
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
      this.$root.$emit('resourceLoader', true)
      this.form.category = this.category;
      this.form.tags = this.tags;
      this.form.description = this.description;
      helpers.formDataRequest("books/new", {model: JSON.stringify(this.form), file: this.file, thumbnail: this.thumbnail}).then(() => {
        this.$root.$emit('resourceLoader', false)
        this.$root.$emit('notifyAlert', "Done!");
      })
      return;
      // helpers.uploadFile()
      // helpers.makeRequest("books/new", "post", {
      //   data: {
      //     title: "test"
      //   }
      // }).then(res => {
      //   this.items = res.data
      // })
    },
    remove (item, collect) {
      if (this[collect] instanceof Array) {
        this[collect].splice(this[collect].indexOf(item), 1)
        this[collect] = [...this[collect]]
      } else {
        this[collect] = ""
      }
      
    },
  },
  data() {
    return {
      items: [],
      form: {},
      file: null,
      thumbnail: null,
      tags: [],
      category: "",
      description: "",
      author: ""
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
