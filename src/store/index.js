import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    products: [],
    product: null,
    cart: [],
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    setProduct(state, product) {
      state.product = product;
    },
    addToCart(state, product) {
      const existingItem = state.cart.find(item => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },
    setCart(state, cartData) {
      state.cart = cartData;
    }
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        commit('setProducts', response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    async fetchProduct({ commit }, productId) {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        commit('setProduct', response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    },
    async fetchCart({ commit }) {
      try {
        const response = await axios.get('https://fakestoreapi.com/carts');
        commit('setCart', response.data);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    },
    async addToCart({ commit }, product) {
      try {
        const response = await fetch('https://fakestoreapi.com/carts', {
          method: 'POST',
          body: JSON.stringify({
            userId: 5,
            date: new Date().toISOString().split('T')[0],
            products: [{ productId: product.id, quantity: 1 }],
          }),
          headers: { 'Content-Type': 'application/json' },
        });

        commit('addToCart', product);
        
        return Promise.resolve();
      } catch (error) {
        console.error('Error adding to cart:', error);
        return Promise.reject(error);
      }
    }
  },
  getters: {
    products: (state) => state.products,
    product: (state) => state.product,
    cart: (state) => state.cart,
    cartCount: (state) => {
      return state.cart.reduce((total, item) => total + item.quantity, 0);
    },
  },
});

export default store;