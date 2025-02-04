import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'ProductsList',
    component: () => import('@/views/ProductsList.vue'),
  },
  {
    path: '/product/:id',
    name: 'ProductDetails',
    component: () => import('@/views/ProductDetails.vue'),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;