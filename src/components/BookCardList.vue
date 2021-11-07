<template>
  <div class="book-items-container">
    <div class="book-item-container" v-for="item of items" v-bind:key="item.id">

        <router-link class="book-item-card" tag="div" :to="'books/'+item.id" >
          <div class="book-item-card-inner" v-bind:style="{'background': 'url('+item.backgroundImg+')'}">
            <div class="card-header"></div>
            <div class="card-body"></div>
            <div class="card-footer">{{item.title}}</div>
          </div>
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
    gap: 0.5em;
    font-size: 19px;
  }

  .book-item-container {
    flex: 0 0 200px;
  }
  .book-item-card {
      min-height: 280px;
      height: 280px;
      background-color: rgb(235, 235, 235);
      /* border-radius: 5px; */
      border-radius: 4px;

      cursor: pointer;
    .book-item-card-inner {
      padding: 0.5em;
      height: 100%;
      background-size: cover !important;
      
      
    }
      

  }
  .book-item-card:hover {
    /* background-color: rgb(226, 226, 226); */
    /* transition: cubic-bezier(0.075, 0.82, 0.165, 1); */
    box-shadow: 1px 1px 20px -5px black;
    transition-duration: 400ms;
  }
</style>
