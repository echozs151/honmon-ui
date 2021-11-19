<template>
  <div class="book-items-container">
    <div class="book-item-container" v-for="item of items" v-bind:key="item.id">

        <router-link class="book-item-card" tag="div" :to="'books/'+item.id" >
          <!-- <div class="placeholder-title-text">{{item.title}}</div> -->
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <div v-bind="attrs" v-on="on" class="book-item-card-inner" v-bind:style="{'background': 'url('+item.backgroundImg+')'}">
                <div class="card-header"></div>
                <div class="card-body"></div>
                <div class="card-footer"></div>
              </div>
            </template>
            {{item.title}}
          </v-tooltip>
          <!-- <div class="book-item-card-outbox">
            {{item.title}}
          </div> -->
        </router-link>

      

    </div>

  </div>
</template>

<script>
export default {
  name: 'BookCardList',
  props: {
    items: Array
  },
  data() {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .book-items-container {
    display: flex;
    padding: 1em;
    gap: 0.8em;
    font-size: 19px;
    flex-wrap: wrap;
    transition:cubic-bezier(0.075, 0.82, 0.165, 1) 600ms;
  }

  .book-item-container {
    flex: 0 0 200px;
    min-height: 340px;
    z-index: 1;
    &:hover {
        z-index: 5;
    }
  }
  .book-item-card {
      min-height: 320px;
      height: 320px;
      background-color: rgb(235, 235, 235);
      /* border-radius: 5px; */
      border-radius: 4px;
      z-index: 9;
      position: relative;

      cursor: pointer;
    .book-item-card-inner {
      padding: 0.5em;
      height: calc(100% - 40px);
      background-size: cover !important;
    }
    .placeholder-title-text {
      position: absolute;
    display: block;
    width: inherit;
    }

    .book-item-card-outbox {
      height: 40px;
      border-radius: 0 0 5px 5px;
      background: #e9e8e8;
      transition: ease-in 100ms;
      overflow: hidden;
      text-overflow: clip;

      &:hover {
        height: 80px;
        // box-shadow: 0px 6px 30px -10px black;
        box-shadow: 0px 13px 34px -11px black;
        transition: ease-in 100ms;
        z-index: 5;
      }
    }

    
      

  }
  .book-item-card:hover {
    /* background-color: rgb(226, 226, 226); */
    /* transition: cubic-bezier(0.075, 0.82, 0.165, 1); */
    box-shadow: 1px 1px 20px -5px black;
    transition-duration: 400ms;
    z-index: 10;
  }
</style>
