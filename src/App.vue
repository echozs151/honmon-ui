<template>
  <v-app id="inspire">
    <v-navigation-drawer
    v-bind:style="{backgroundImage: 'url('+image+')',backgroundSize: 'contain',backgroundPosition: 'bottom'}"
      v-model="drawer"
      app
    >
    <div id="nav" >
      <div class="navlist-demo">
      <!-- 
      <router-link to="/books">Books</router-link>
      <router-link to="/add-book">Add Book</router-link>
      <router-link to="/about">About</router-link> -->

      <v-list dense nav>
        <template v-for="route in routes">
        <v-list-item  :key="route.name" link :to="route.path" v-if="route.nav">

          <v-list-item-icon>
            <v-icon>{{ route.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title >{{ route.name }}</v-list-item-title>
          </v-list-item-content>

        </v-list-item>
        </template>
      </v-list>


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

  <div class="notification-alert">
    <v-alert 
      :value="alert"
      color="green"
      dark
      border="left"
      transition="slide-x-transition"
      >{{this.alertMsg}}</v-alert>
  </div>
  </v-app>

  
</template>

<script>
import PageActions from "@/components/PageActions";
import routeNav from "./router/index";

export default {
  data: () => ({routes: routeNav.options.routes, drawer: null, test: null, appLoading: false, pageLoading: false, pageActions: [], alert: false, alertMsg: "", image: '"https://pbs.twimg.com/media/FDQpC78VEAIgdOu?format=jpg&name=large"'}),
  components: {
    PageActions
  },
  created() {
    this.$root.$on('resourceLoader', (toggle) => this.appLoading = toggle);
    this.$root.$on('pageLoader', (toggle) => this.pageLoading = toggle);
    this.$root.$on('setPageActions', (actions) => this.pageActions = actions);
    this.$root.$on('notifyAlert', (msg) => {
      this.alert = true;
      this.alertMsg = msg;
      console.log(this)
      window.setTimeout(() => {
        this.alert = false;
        this.alertMsg = ""
      }, 3000) 
    })

    
  },
  methods: {
    hideAlert() {
      console.log('Hide')
      // `event` is the native DOM event
         
    }
  },
  mounted() {
    console.log();
    // this.hideAlert();

    

    

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
.notification-alert {
  position: fixed;
  bottom: 0;
  right: 5px;
  width: 250px;
}
</style>
