import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import ProductList from '@/views/ProductList.vue'
import ProductDetails from '@/views/ProductDetails.vue'

const routes = [
  { path: '/', name: 'ProductList', component: ProductList },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router