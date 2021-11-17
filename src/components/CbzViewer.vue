<template>
  <div class="cbz-viewer">
    <div class="entries-container">
      <div v-for="entry of this.entries" :key="entry">
        <p @click="loadFile(entry)">{{entry}}</p>
      </div>
    </div>

    <div class="cbz-viewpoint">
        <img alt="hi" :src="this.imgSrc"/>
    </div>
  </div>
</template>

<script>
import helpers from '../helpers';

export default {
    name: "CbzViewer",
    props: {
      id: null
    },
    mounted() {
      console.log('loading '+ this.id)
      this.$root.$emit('resourceLoader', true)
      helpers.makeRequest("books/cbz-meta/"+this.id, "get").then((res) => {
        this.entries = res.data
        this.$root.$emit('resourceLoader', false)
      })
    },
    data() {
      return {
        entries: [],
        imgSrc: null
      }
    },
    methods: {
      loadFile(fileName) {
        helpers.makeRequest("books/cbz-img/"+this.id,"POST", {
          data: {
            name: fileName
          }
        }).then((res) => {
          console.log(res);
        })

      }

    }
}
</script>

<style lang="scss" scoped>
  .cbz-viewer {
    display: flex;
  }
  .cbz-viewpoint {
    flex: 1;
  }
  .entries-container {
    display: flex;
    flex: 0 0 200px;
    flex-direction: column;
    max-height: 500px;
    overflow-y: scroll;
  }
</style>