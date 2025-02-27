export default {
    isAuthenticated: (state) => state.isAuthenticated,
    user: state => state.user,
    products: (state) => state.products,
    product: (state) => state.product,
    cart: (state) => state.cart,
    cartCount: (state) => {
      return state.cart.reduce((total, item) => total + item.quantity, 0);
    },
    categories: (state) => state.categories,
    categoryItems: (state) => state.categoryItems,
    filteredProducts: state => {
      if (!state.searchQuery) return state.products;
      
      const query = state.searchQuery.toLowerCase();
      return state.products.filter(product => {
        return (
          product.title.toLowerCase().includes(query)
        );
      });
    }
  };