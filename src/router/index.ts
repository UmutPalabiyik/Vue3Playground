import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Todos from '../views/Todos.vue'
import Users from '../views/Users.vue'
import Forms from '../views/Forms.vue'
import About from '../views/About.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/todos',
    name: 'Todos',
    component: Todos
  },
  {
    path: '/users',
    name: 'Users',
    component: Users
  },
  {
    path: '/forms',
    name: 'Forms',
    component: Forms
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
