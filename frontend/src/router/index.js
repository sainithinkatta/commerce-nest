import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

const routes = [
  {
    path: '/',
    name: 'ProductsList',
    component: () => import('@/views/ProductsList.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    beforeEnter: (to, from, next) => {
      if (store.getters.isAuthenticated) {
        next('/');
      } else {
        next();
      }
    }
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('@/views/SignUp.vue'),
    beforeEnter: (to, from, next) => {
      if (store.getters.isAuthenticated) {
        next('/');
      } else {
        next();
      }
    }
  },
  {
    path: '/product/:id',
    name: 'ProductDetails',
    component: () => import('@/views/ProductDetails.vue'),
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/views/Cart.vue')
  },
  {
    path: '/categories',
    name: 'Categories',
    component: () => import('@/views/Categories.vue')
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;