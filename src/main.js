import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import './assets/tailwind.css'
let app;
Vue.config.productionTip = false
let mixin = {
  data() {
    return {
      baseUrl: process.env.VUE_APP_APIPATH+'api/',
      resourceUrl: process.env.VUE_APP_APIPATH+'resource/'
    }
  },
  methods: {
    testMixin: () => console.log('test mixin!')
  }
}

app = new Vue({
  vuetify,
  router,
  store,
  mixins: [mixin],
  methods:{
    loader: (toggle) => console.log(app, this, toggle)
  },
  render: h => h(App)
}).$mount('#app')
