const savedCart = JSON.parse(localStorage.getItem('cart')) || [];

export default {
  products: [],
  product: null,
  cart: savedCart,
  searchQuery: '',
  categories: [],
  categoryItems: [],
};