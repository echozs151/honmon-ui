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
    </v-app-bar>

    <v-main>
      <!--  -->
      <v-container style="padding: 24px;">
        <div >
          <router-view/>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({drawer: null, test: null})
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
</style>
