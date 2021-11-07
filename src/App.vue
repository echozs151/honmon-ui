<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
    <div id="nav">
      <div class="navlist-demo">
      <router-link to="/">Home</router-link>
      <router-link to="/books">Books</router-link>
      <router-link to="/add-book">Add Book</router-link>
      <router-link to="/about">About</router-link>
      </div>
    </div>
      <!--  -->
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer></v-spacer>
      <page-actions v-bind:actions="pageActions"></page-actions>
    </v-app-bar>

    <v-main>
      <!--  -->
      <div :class="{'hide-loader':!pageLoading}" class="page-loader"><v-progress-circular id="pageLoaderProgress" size="100" indeterminate></v-progress-circular></div>
      <div style="min-height: 4px;">
      <v-progress-linear :active="appLoading" id="app-loader" ref="app-loader" indeterminate />
      </div>
      <v-container style="padding: 24px;">
        <div>
          <router-view/>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import PageActions from "@/components/PageActions";
export default {
  data: () => ({drawer: null, test: null, appLoading: false, pageLoading: false, pageActions: []}),
  components: {
    PageActions
  },
  created() {
    this.$root.$on('resourceLoader', (toggle) => this.appLoading = toggle);
    this.$root.$on('pageLoader', (toggle) => this.pageLoading = toggle);
    this.$root.$on('setPageActions', (actions) => this.pageActions = actions);

    
  },
  mounted() {
  }
}
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.navlist-demo {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.page-loader {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgb(228, 228, 228);
  opacity: 0.7;
  pointer-events: none;

  

  #pageLoaderProgress {
    display: flex;
    margin: auto;
    vertical-align: middle;
    margin-top:25%;
    
  }
}
.hide-loader {
  opacity: 0;
  transition: 800ms;


}
</style>
