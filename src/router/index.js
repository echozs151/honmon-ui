import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Book from '../views/Book.vue'
import AddBook from '../views/AddBook.vue'
import BookView from '../views/BookView.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/books',
    name: 'Books',
    component: Book
  },
  {
    path: '/books/:id',
    name: 'BookView',
    component: BookView
  },
  {
    path: '/add-book',
    name: 'Add Book',
    component: AddBook
  }
]

const router = new VueRouter({
  routes
})

export default router
