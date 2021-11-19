<template>
<v-card class="px-8 py-8">
  <edit-book></edit-book>
</v-card>
</template>

<script>
// @ is an alias to /src
import EditBook from '@/components/EditBook.vue'
// import AppVue from '../App.vue';

// import axios from 'axios'
export default {
  name: 'AddBook',
  components: {
    EditBook
  },
  methods: {
    
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
  }
}
</script>
