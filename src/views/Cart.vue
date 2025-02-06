<template>
  <div class="cart-page px-4 py-8 max-w-7xl mx-auto bg-gray-50 min-h-screen">
    <h2 class="text-3xl font-bold mb-8 text-gray-800">Your Cart</h2>

    <div v-if="cart.length > 0" class="space-y-8">
      <ul class="space-y-4">
        <li v-for="item in cart" :key="item.id" 
            class="flex flex-col md:flex-row md:items-center justify-between p-6 bg-white shadow-md rounded-xl hover:shadow-lg transition-shadow duration-300">
          <!-- Product Image and Details -->
          <div class="flex items-start space-x-6 mb-4 md:mb-0">
            <img :src="item.image" alt="Product Image" 
                 class="h-24 w-24 object-cover rounded-lg shadow-sm" />
            
            <div class="flex flex-col flex-grow space-y-2">
              <h3 class="font-semibold text-lg text-gray-800">{{ item.title }}</h3>
              <p class="text-sm text-gray-500 line-clamp-2">{{ item.description }}</p>
              <p class="text-sm font-medium text-gray-600">Category: {{ item.category }}</p>
            </div>
          </div>

          <!-- Price, Quantity, and Actions -->
          <div class="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-10">
            <!-- Price -->
            <div class="flex flex-col items-start">
              <span class="text-sm text-gray-500">Price</span>
              <span class="font-medium text-gray-900">${{ item.price }}</span>
            </div>

            <!-- Quantity Controls -->
            <div class="flex flex-col items-start">
              <span class="text-sm text-gray-500 mb-1">Quantity</span>
              <div class="flex items-center space-x-2 bg-gray-50 rounded-lg p-1">
                <button 
                  @click="decreaseQuantity(item.id)"
                  class="w-8 h-8 flex items-center justify-center bg-white rounded-md hover:bg-gray-100 border border-gray-200 transition duration-200"
                >
                  <span class="text-gray-600">-</span>
                </button>
                <span class="w-10 text-center font-medium text-gray-900">{{ item.quantity }}</span>
                <button 
                  @click="increaseQuantity(item.id)"
                  class="w-8 h-8 flex items-center justify-center bg-white rounded-md hover:bg-gray-100 border border-gray-200 transition duration-200"
                >
                  <span class="text-gray-600">+</span>
                </button>
              </div>
            </div>

            <!-- Total -->
            <div class="flex flex-col items-start">
              <span class="text-sm text-gray-500">Subtotal</span>
              <span class="font-medium text-gray-900">${{ (item.price * item.quantity).toFixed(2) }}</span>
            </div>

            <!-- Remove Button -->
            <button
              @click="removeItemFromCart(item.id)"
              class="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors duration-200 w-full md:w-auto"
            >
              Remove
            </button>
          </div>
        </li>
      </ul>

      <!-- Cart Summary -->
      <div class="bg-white rounded-xl shadow-md p-6 space-y-4">
        <div class="flex justify-between items-center border-b border-gray-100 pb-4">
          <span class="text-lg text-gray-600">Summary</span>
          <span class="text-2xl font-bold text-gray-900">Total  - ${{ totalAmount }}</span>
        </div>
        
        <div class="flex justify-end pt-2">
          <button class="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-300 font-medium shadow-sm hover:shadow-md">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>

    <div v-else class="flex flex-col items-center justify-center py-16 bg-white rounded-xl shadow-md">
      <p class="text-xl text-gray-500 mb-4">Your cart is empty</p>
      <button 
        class="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
        @click="$router.push('/')" 
      >
        Continue Shopping
      </button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    cart() {
      return this.$store.getters.cart;
    },
    totalAmount() {
      return this.cart.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2);
    },
  },
  methods: {
    removeItemFromCart(productId) {
      this.$store.dispatch('removeFromCart', productId);
    },
    increaseQuantity(productId) {
      this.$store.dispatch('updateQuantity', { productId, change: 1 });
    },
    decreaseQuantity(productId) {
      this.$store.dispatch('updateQuantity', { productId, change: -1 });
    }
  },
};
</script>