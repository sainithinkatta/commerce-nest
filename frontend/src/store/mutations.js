export default {
    setUser(state, user) {
      state.user = user;
      state.isAuthenticated = !!user;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
    setProducts(state, products) {
      state.products = products;
    },
    setProduct(state, product) {
      state.product = product;
    },
    setSearchQuery(state, query) {
      state.searchQuery = query;
    },
    setCategories(state, categories) {
      state.categories = categories;
    },
    setCategoryItems(state, categoryItems) {
      state.categoryItems = categoryItems;
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
  };