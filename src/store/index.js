import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    products: [],
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
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
  },
  getters: {
    products: (state) => state.products,
  },
});

export default store;