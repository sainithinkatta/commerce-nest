import { createStore } from 'vuex';
import axios from 'axios';

const savedCart = JSON.parse(localStorage.getItem('cart')) || [];

const store = createStore({
  state: {
    products: [],
    product: null,
    cart: savedCart,
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

      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    setCart(state, cartData) {
      state.cart = cartData;

      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    removeFromCart(state, productId) {
      state.cart = state.cart.filter(item => item.id !== productId);

      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    updateCartItemQuantity(state, { productId, change }) {
      const item = state.cart.find(item => item.id === productId);
      if (item) {
        const newQuantity = Math.max(1, item.quantity + change);
        item.quantity = newQuantity;

        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
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
    },
    removeFromCart({ commit }, productId) {
      axios.delete(`https://fakestoreapi.com/carts/${productId}`)
        .then(() => {
          commit('removeFromCart', productId);
        })
        .catch(error => {
          console.error('Error removing item from cart:', error);
        });
    },
    updateQuantity({ commit, state }, { productId, change }) {
      const item = state.cart.find(item => item.id === productId);
      if (!item) return;
    
      const newQuantity = Math.min(15, Math.max(1, item.quantity + change));
    
      if (newQuantity === item.quantity) return; 
    
      axios.put(`https://fakestoreapi.com/carts/${productId}`, {
        date: new Date().toISOString().split('T')[0],
        products: [{ productId, quantity: newQuantity }]
      })
        .then(() => {
          commit('updateCartItemQuantity', { productId, change });
        })
        .catch(error => {
          console.error('Error updating quantity:', error);
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