export default {
    products: (state) => state.products,
    product: (state) => state.product,
    cart: (state) => state.cart,
    cartCount: (state) => {
      return state.cart.reduce((total, item) => total + item.quantity, 0);
    },
  };