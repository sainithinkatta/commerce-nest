export default {
    products: (state) => state.products,
    product: (state) => state.product,
    cart: (state) => state.cart,
    cartCount: (state) => {
      return state.cart.reduce((total, item) => total + item.quantity, 0);
    },
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