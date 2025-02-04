import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    products: [],
    product: null,
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    setProduct(state, product) {
      state.product = product;
    },
  },
  actions: {
    fetchProducts({ commit }) {
      axios
        .get('https://fakestoreapi.com/products')
        .then((response) => {
          commit('setProducts', response.data);
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
        });
    },
    fetchProduct({ commit }, productId) {
      axios
        .get(`https://fakestoreapi.com/products/${productId}`)
        .then((response) => {
          commit('setProduct', response.data);
        })
        .catch((error) => {
          console.error('Error fetching product details:', error);
        });
    },
  },
  getters: {
    products: (state) => state.products,
    product: (state) => state.product, // New getter for single product
  },
});

export default store;