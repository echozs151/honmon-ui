<template>
  <div class="edit-book">
    
    <form @submit.prevent="saveBook">
    <v-text-field prepend-icon="mdi-book-open" v-model="form.title" name="title" label="Title" ></v-text-field>
    <v-text-field prepend-icon="mdi-book-open" v-model="form.collection" name="collection" label="Collection" ></v-text-field>
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
          <!-- <span>(interest)</span> -->
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
          <span></span>
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
  </div>
</template>

<script>
// @ is an alias to /src
import helpers from '../helpers.js';
// import AppVue from '../App.vue';

// import axios from 'axios'
export default {
  name: 'EditBook',
  components: {
    
  },
  props: {
    item: {}
  },
  methods: {
    saveBook() {
      this.$root.$emit('resourceLoader', true)
      this.form.category = this.category;
      this.form.tags = this.tags;
      this.form.description = this.description;

      
      if (!this.item) {
        helpers.formDataRequest("books/new", {model: JSON.stringify(this.form), file: this.file, thumbnail: this.thumbnail}).then(() => {
          this.$root.$emit('resourceLoader', false)
          this.$root.$emit('notifyAlert', "Done!");
        })
      } else {
        this.item.author = this.form.author;
        this.item.title = this.form.title;
        helpers.formDataRequest("books/"+this.item.id, {model: JSON.stringify(this.form), thumbnail: this.thumbnail}, {}, "PUT").then(() => {
          this.$root.$emit('resourceLoader', false)
          this.$root.$emit('notifyAlert', "Done!");
        })
      }
      
      return;
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
    if (this.item) {
      let val = this.item;
      this.category = val.category;
      this.tags = val.tags;
      this.description = val.description;
      this.form = {
        ...this.form, 
        title: val.title,
        author: val.author,
        category: val.category,
        collection: val.collection
        // tags: val.tags,
      };
    }
  },
  watch: {
    item(val) {
      this.category = val.category;
      this.tags = val.tags;
      this.description = val.description;
      this.form = {
        ...this.form, 
        title: val.title,
        author: val.author,
        category: val.category,
        collection: val.collection
        // tags: val.tags,
      };
    }
  }
}
</script>
