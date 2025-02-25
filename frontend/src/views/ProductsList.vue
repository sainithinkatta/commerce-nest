<template>
  <div class="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="mb-10 mt-12 text-center">
        <p v-if="!loading && products.length !== 0" class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Discover our latest collection of high-quality products
        </p>
      </div>

       <!-- Toast Component -->
      <Toast ref="toastRef" />

      <div v-if="!loading && products.length === 0" class="text-center text-gray-500 text-lg py-10">
        No products found
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div 
          v-for="product in products" 
          :key="product.id" 
          class="block bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
        >
          <router-link :to="'/product/' + product.id" class="block">
            <div class="relative overflow-hidden h-64 flex items-center justify-center">
              <img 
                :src="product.image"
                :alt="product.title" 
                class="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-110"
                @error="handleImageError"
              />
            </div>
          </router-link>
          
          <div class="p-5">
            <router-link :to="'/product/' + product.id">
              <h3 class="text-lg font-semibold text-gray-800 mb-2 truncate">
                {{ product.title }}
              </h3>
            </router-link>
            <p class="text-sm text-gray-500 mb-4 line-clamp-2">
              {{ product.description }}
            </p>
            <div class="flex justify-between items-center">
              <span class="text-xl font-bold text-blue-600">
                ${{ product.price.toFixed(2) }}
              </span>

              <button 
                @click.stop="addProductToCart(product)" 
                class="bg-gradient-to-r from-blue-600 to-purple-700 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 flex items-center space-x-2 cursor-pointer"
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

      <div v-if="loading" class="text-center py-10">
        <div class="animate-pulse">
          <div class="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
          <div class="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
        </div>
      </div>

      <div v-if="error" class="text-center py-10 text-red-500">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Toast from '@/components/Toast.vue';

export default {
  name: 'ProductsList',
  components: {
    Toast,
  },
  data() {
    return {
      loading: true,
      error: null,
    };
  },
  computed: {
    ...mapState({
      searchQuery: state => state.searchQuery
    }),
    products() {
      return this.$store.getters.filteredProducts;
    }
  },
  methods: {
    ...mapActions(['fetchProducts', 'addToCart']),
    
    async addProductToCart(product) {
      await this.addToCart(product);
      this.$refs.toastRef.showToast('Item added to cart!');
    },

    handleImageError(event) {
      event.target.src = 'https://via.placeholder.com/150?text=Product+Image';
    },
  },
  created() {
    this.fetchProducts()
      .then(() => {
        this.loading = false;
      })
      .catch((error) => {
        this.error = 'Failed to load products';
        this.loading = false;
        console.error('Product fetch error:', error);
      });
  },
};
</script>