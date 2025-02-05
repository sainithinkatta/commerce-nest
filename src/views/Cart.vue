<template>
  <div class="cart-page px-4 py-8 max-w-7xl mx-auto">
    <h2 class="text-2xl font-bold mb-6">Your Cart</h2>

    <div v-if="cart.length > 0">
      <ul>
        <li v-for="item in cart" :key="item.id" class="flex items-center justify-between mb-6 p-4 bg-white shadow-lg rounded-lg">
          <div class="flex items-center space-x-6">
            <img :src="item.image" alt="Product Image" class="h-20 w-20 object-cover rounded-md" />
            <div class="flex flex-col">
              <h3 class="font-semibold text-lg text-gray-800">{{ item.title }}</h3>
              <p class="text-sm text-gray-500">{{ item.description }}</p>
              <p class="text-sm text-gray-700">Category: {{ item.category }}</p>
              <div class="mt-2 flex items-center space-x-4">
                <span class="text-gray-700">Price: ${{ item.price }}</span>
                <span class="text-gray-700">Quantity: {{ item.quantity }}</span>
              </div>
              <button
                @click="removeItemFromCart(item.id)"
                class="mt-2 text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        </li>
      </ul>

      <div class="flex justify-between mt-8 p-4 bg-gray-100 rounded-lg shadow-sm">
        <span class="font-semibold text-xl">Total: ${{ totalAmount }}</span>
        <button class="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
          Checkout
        </button>
      </div>
    </div>

    <div v-else class="text-center">
      <p class="text-lg text-gray-500">Your cart is empty.</p>
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
        // remove cart logic..
      },
    },
  };
</script>