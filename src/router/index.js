import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Book from '../views/Book.vue'
import AddBook from '../views/AddBook.vue'
import BookView from '../views/BookView.vue'
import BookReader from '../views/BookReader.vue'
import Manage from '../views/Manage.vue'
import ManageBooks from '../views/ManageBooks.vue'
import Collections from '../views/Collections.vue'
import Tags from '../views/Tags.vue'
import Categories from '../views/Categories.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    icon: 'mdi-home',
    nav: true
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
    component: Book,
    icon: 'mdi-book',
    nav: true
  },
  {
    path: '/collections',
    name: 'Collections',
    component: Collections,
    icon: 'mdi-book',
    nav: true
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories,
    icon: 'mdi-book',
    nav: true
  },
  {
    path: '/tags',
    name: 'Tags',
    component: Tags,
    icon: 'mdi-book',
    nav: true
  },
  {
    path: '/books/:id',
    name: 'Book View',
    component: BookView,
    icon: "mdi-eye",
  },
  {
    path: '/books/:id/reader',
    name: 'Book Reader',
    component: BookReader,
    icon: "mdi-eye",
  },
  {
    path: '/add-book',
    name: 'Add Book',
    component: AddBook,
    icon: "mdi-book-plus",
    nav: true
  },
  {
    path: '/manage',
    name: 'Manage',
    component: Manage,
    icon: "mdi-cog",
    nav: true
  },
  {
    path: '/manage/books',
    name: "Manage Books",
    component: ManageBooks
  }
]

const router = new VueRouter({
  routes
})

export default router
