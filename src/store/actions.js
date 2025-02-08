import axios from 'axios';
import API_URLS from '../api/apiUrls';

export default {
  fetchProducts({ commit }) {
    return axios.get(API_URLS.PRODUCTS)
      .then(response => {
        commit('setProducts', response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        throw error;
      });
  },
  fetchProduct({ commit }, productId) {
    return axios.get(`${API_URLS.PRODUCTS}/${productId}`)
      .then(response => {
        commit('setProduct', response.data);
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
        throw error;
      });
  },
  addToCart({ commit }, product) {
    return axios.post(API_URLS.CARTS, {
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
        throw error;
      });
  },
  removeFromCart({ commit }, productId) {
    return axios.delete(`${API_URLS.CARTS}/${productId}`)
      .then(() => {
        commit('removeFromCart', productId);
      })
      .catch(error => {
        console.error('Error removing item from cart:', error);
        throw error;
      });
  },
  updateQuantity({ commit, state }, { productId, change }) {
    const item = state.cart.find(item => item.id === productId);
    if (!item) return Promise.reject(new Error('Item not found in cart'));

    const newQuantity = Math.min(15, Math.max(1, item.quantity + change));
    if (newQuantity === item.quantity) return Promise.resolve();

    return axios.put(`${API_URLS.CARTS}/${productId}`, {
      date: new Date().toISOString().split('T')[0],
      products: [{ productId, quantity: newQuantity }]
    })
      .then(() => {
        commit('updateCartItemQuantity', { productId, change });
      })
      .catch(error => {
        console.error('Error updating quantity:', error);
        throw error;
      });
  },
  fetchCategories({ commit }) {
    return axios.get(API_URLS.CATEGORIES)
      .then(response => {
        commit('setCategories', response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        throw error;
      });
  },
};