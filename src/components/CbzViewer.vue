<template>
  <div class="cbz-viewer">
    <div class="entries-container">
      <v-card>
      <div class="entries">
        <div v-for="entry of this.entries" :key="entries.indexOf(entry)">
          <a v-bind:class="{'selected': (entry == currentPage.fileName)}" @click="loadFile(entry)">{{entry}}</a>
        </div>  
      </div>
      
      <v-slider v-model="imgZoom" max="1500" min="750" label="zoom"></v-slider>
      <div>{{imgZoom}}</div>

      <v-btn @click="toggleTwoPages()" icon text><v-icon>mdi-book-open</v-icon></v-btn>
      <v-btn @click="toggleDirection()" icon text><v-icon>mdi-arrow-left</v-icon></v-btn>
      <div>{{currentPage.fileName}}</div>
      </v-card>
    </div>

    <div class="cbz-viewpoint">
      <v-card style="display: flex; overflow-x: scroll; overflow-y: hidden;">
        <template v-if="twoPages">
          <template v-if="!switchDirection">
            <img v-bind:style="{ 'max-height': imgZoom+'px'}" style="max-width: 100%; display: flex; margin-left: auto;" :src="this.imgSrc1"/>
            <img v-bind:style="{ 'max-height': imgZoom+'px'}" style="max-width: 100%; display: flex; margin-right: auto;" :src="this.imgSrc2"/>  
          </template>
          <template v-if="switchDirection">
            <img v-bind:style="{ 'max-height': imgZoom+'px'}" style="max-width: 100%; display: flex; margin-left: auto;" :src="this.imgSrc2"/>  
            <img v-bind:style="{ 'max-height': imgZoom+'px'}" style="max-width: 100%; display: flex; margin-right: auto;" :src="this.imgSrc1"/>
          </template>
        </template>
        <template v-if="!twoPages">
          <img v-bind:style="{ 'max-height': imgZoom+'px'}" style="max-width: 100%; display: flex; margin: auto;" :src="this.imgSrc"/>  
        </template>

        <div class="cbz-inview-controls">
          <template v-if="!switchDirection">
            <div @click="prevPage()" class="cbz-control back"></div>
            <div @click="nextPage()" class="cbz-control forward"></div>
          </template>
          <template v-if="switchDirection">
            <div @click="nextPage()" class="cbz-control forward"></div>
            <div @click="prevPage()" class="cbz-control back"></div>
          </template>
          
        </div>
      </v-card>
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
      this.$root.$emit('resourceLoader', true)
      helpers.makeRequest("books/cbz-meta/"+this.id, "get").then((res) => {
        this.entries = res.data
        helpers.makeRequest("books/"+this.id, "get").then((book) => {
          if (book.data.progress > 0) {
            this.loadFile(this.entries[book.data.progress-1])
          }
        })
        this.$root.$emit('resourceLoader', false)
      })
    },
    data() {
      return {
        imgZoom: 1000,
        entries: [],
        imgSrc: null,
        imgSrc1: null,
        imgSrc2: null,

        currentPage: {
          fileName: null,
          nextPage: null,
          prevPage: null
        },
        twoPages: false,
        switchDirection: false
      }
    },
    methods: {
      loadFile(fileName) {
        const index = this.entries.indexOf(fileName);
        if (this.twoPages) {
          let fileName2 = this.entries[index+1];
          this.imgSrc1 = this.$root.resourceUrl+"cbz-img/"+this.id+"/"+btoa(fileName)+"?progress="+(index+1).toString();
          this.imgSrc2 = this.$root.resourceUrl+"cbz-img/"+this.id+"/"+btoa(fileName2)+"?progress="+(index+1).toString();
          this.currentPage = {
            fileName,
            index,
            nextPage: this.entries[index+2] ?? this.entries.length-1,
            prevPage: this.entries[index-2] ?? 0
          }
        } else {
          this.imgSrc = this.$root.resourceUrl+"cbz-img/"+this.id+"/"+btoa(fileName)+"?progress="+(index+1).toString();
          this.currentPage = {
            fileName,
            index,
            nextPage: this.entries[index+1] ?? this.entries.length-1,
            prevPage: this.entries[index-1] ?? 0
          }  
        }
        
        
        window.scrollTo(0, 0);

      },
      nextPage() {
        if (this.currentPage.nextPage != null) {
          this.loadFile(this.currentPage.nextPage)
        }
      },
      prevPage() {
        if (this.currentPage.prevPage != null) {
          this.loadFile(this.currentPage.prevPage)
        }
        
      },
      toggleTwoPages() {
        this.twoPages = !this.twoPages;
        if (this.currentPage) {
          this.loadFile(this.currentPage.fileName)
        }
        
        
      },
      toggleDirection() {
        this.switchDirection = !this.switchDirection;
      },
      toggleOffset() {
        this.loadFile(this.entries[this.currentPage.index + 1])

        
      }

    }
}
</script>

<style lang="scss" scoped>
  .cbz-viewer {
    display: flex;
  }
  .cbz-viewpoint {
    flex: 1 1;
    position: relative;
    padding: 5px;
  }
  .entries-container {
    flex: 0 0 200px;
    padding: 5px;
    .entries {
      display: flex;
      margin-left: 10px;
      gap: 2px;
      flex-direction: column;
      max-height: 500px;
      overflow-y: scroll;
     
     .selected {
        background: red;
      }
    }
  }

  .cbz-inview-controls {
    top: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: gray;
    opacity: 0;
    z-index: 100;
    display: flex;

    .cbz-control {
      cursor: pointer;
      flex: 1 1 50%;
    }
  }
</style>