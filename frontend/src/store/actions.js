
import axios from 'axios';
import API_URLS from '../api/apiUrls';

export default {
  createAccount({ commit }, userData) {
    return axios.post(API_URLS.CREATE_ACCOUNT, userData)
      .then(response => {
        if (response.data.error) {
          return { 
            success: false, 
            message: response.data.message || 'Registration failed' 
          };
        }

        commit('setUser', response.data.user);

        return { 
          success: true, 
          message: response.data.message || 'Registration successful' 
        };
      })
      .catch(error => {
        console.error('Registration failed', error);
        throw new Error(error.response?.data?.message || 'Registration failed');
      });
  },
  userLogin({ commit }, credentials) {
    return axios.post(API_URLS.LOGIN, credentials, {
      withCredentials: true,
    })
      .then(response => {
        if (response.data.error) {
          return { 
            success: false, 
            message: response.data.message || 'Login failed' 
          };
        }

        commit('setUser', response.data.user);
  
        return { 
          success: true, 
          message: response.data.message || 'Login successful' 
        };
      })
      .catch(error => {
        console.error('Login failed', error);
        return { 
          success: false, 
          message: error.response?.data?.message || 'Login failed' 
        };
      });
  },
  checkAuth({ commit }) {
    return axios.get('/checkAuth', { withCredentials: true })
        .then(response => {
            if (response.data.success) {
              commit('setUser', response.data.user);
            } else {
              commit('setUser', null);
            }
        })
        .catch(error => {
            commit('setUser', null);
            console.error("Authentication check failed:", error);
          });
  },
  fetchUserDetails({ commit }) {
    return axios.get(API_URLS.FETCH_USER)
      .then(response => {
        if (response.data.success) {
          commit('setUser', response.data.user);
          return true;
        } else {
          commit('setUser', null);
          return false;
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          commit('setUser', null);
        }
        console.error('Error fetching user details', error);
        throw new Error(error.response?.data?.message || 'Failed to fetch user details');
      });
  },
  logout({ commit }) {
    return axios.post(API_URLS.LOGOUT)
        .then(response => {
            if (!response.data.error) {
                commit('setUser', null);
                return {
                    success: true,
                    message: response.data.message || 'Logged out successfully'
                };
            } else {
                return {
                    success: false,
                    message: response.data.message || 'Logout failed'
                };
            }
        })
        .catch(error => {
            if (error.response && error.response.status === 401) {
                commit('setUser', null); // Clear user state if unauthorized
            }
            console.error('Logout failed', error);
            throw new Error(error.response?.data?.message || 'Logout failed');
        });
  },
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
  fetchCategoryItems({ commit }, category) {
    return axios.get(`${API_URLS.CATEGORY_ITEMS}/${category}`)
      .then(response => {
        commit('setCategoryItems', response.data);
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
        throw error;
      });
  },
};