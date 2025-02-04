<template>
  <div class="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-10 mt-12 text-center">
        <p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Discover our latest collection of high-quality products
        </p>
      </div>

      <!-- Products Grid -->
      <div 
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <div 
          v-for="product in products" 
          :key="product.id" 
          class="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
        >
          <!-- Product Image -->
          <div class="relative overflow-hidden h-64 flex items-center justify-center">
            <img 
              :src="product.image"
              :alt="product.title" 
              class="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-110"
              @error="handleImageError"
            />
          </div>

          <!-- Product Details -->
          <div class="p-5">
            <h3 class="text-lg font-semibold text-gray-800 mb-2 truncate">
              {{ product.title }}
            </h3>
            <p class="text-sm text-gray-500 mb-4 line-clamp-2">
              {{ product.description }}
            </p>

            <!-- Product Actions -->
            <div class="flex justify-between items-center">
              <span class="text-xl font-bold text-blue-600">
                ${{ product.price.toFixed(2) }}
              </span>
              <div class="flex space-x-2">
                <button 
                  @click="addToCart(product)"
                  class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 flex items-center space-x-2 cursor-pointer"
                >
                  <svg 
                    class="h-5 w-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      stroke-linecap="round" 
                      stroke-linejoin="round" 
                      stroke-width="2" 
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
                    />
                  </svg>
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-10">
        <div class="animate-pulse">
          <div class="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
          <div class="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
        </div>
      </div>

      <!-- Error State -->
      <div v-if="error" class="text-center py-10 text-red-500">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ProductsList',
  data() {
    return {
      loading: true,
      error: null
    }
  },
  computed: {
    ...mapState({
      products: state => state.products
    })
  },
  methods: {
    ...mapActions(['fetchProducts']),

    handleImageError(event) {
      // Fallback image if specific product image fails
      event.target.src = 'https://via.placeholder.com/150?text=Product+Image';
    },
    
    addToCart(product) {
      // Add to cart logic...
    }
  },
  created() {
    this.fetchProducts()
      .then(() => {
        this.loading = false;
      })
      .catch(error => {
        this.error = 'Failed to load products';
        this.loading = false;
        console.error('Product fetch error:', error);
      });
  }
}
</script>