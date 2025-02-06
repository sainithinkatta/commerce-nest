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
    fetchProducts({ commit }) {
      axios.get('https://fakestoreapi.com/products')
        .then(response => {
          commit('setProducts', response.data);
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    },
    fetchProduct({ commit }, productId) {
      axios.get(`https://fakestoreapi.com/products/${productId}`)
        .then(response => {
          commit('setProduct', response.data);
        })
        .catch(error => {
          console.error('Error fetching product details:', error);
        });
    },
    fetchCart({ commit }) {
      axios.get('https://fakestoreapi.com/carts')
        .then(response => {
          commit('setCart', response.data);
        })
        .catch(error => {
          console.error('Error fetching cart data:', error);
        });
    },
    addToCart({ commit }, product) {
      axios.post('https://fakestoreapi.com/carts', {
        userId: 5,
        date: new Date().toISOString().split('T')[0],
        products: [{ productId: product.id, quantity: 1 }],
      }, {
        headers: { 'Content-Type': 'application/json' },
      })
        .then(() => {
          commit('addToCart', product);
        })
        .catch(error => {
          console.error('Error adding to cart:', error);
        });
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