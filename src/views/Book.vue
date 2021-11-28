<template>
  <div class="home">
    <v-subheader style="font-size: 20px;">Recent Reads</v-subheader>
    <BookCardList v-bind:items="itemsRecent"/>
    <v-subheader style="font-size: 20px;">All Books</v-subheader>
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
      itemsRecent: [],
      loaded: false
    }
  },
  mounted() {
    helpers.comp = this
    this.$root.$emit("pageLoader", true)
    if (!this.loaded) {
      helpers.makeRequest("books", "get").then(res => {
        let that = this;
        this.items = res.data.map((item) => {
          item.backgroundImg = that.$root.resourceUrl+'book-thumbnail/'+item.id
          return item
        })

        this.itemsRecent = this.items
          .filter((item) => {
            return item.lastAccess != null;
        })
          .sort((a, b) => {
            if (a && b) {
              return new Date(b.lastAccess).getTime() - new Date(a.lastAccess).getTime();
            }
            
          })
        this.loaded = true;
        this.$root.$emit("pageLoader", false)
      })
    }
    
  },
  created() {
    
  }

}
</script>
