<template>
  <div class="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">

    <!-- Toast Component -->
    <Toast ref="toastRef" />

    <div class="max-w-7xl mx-auto mt-24">
      <!-- Loading State -->
      <div v-if="loading" class="max-w-5xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="animate-pulse bg-white rounded-xl h-[400px]"></div>
          <div class="space-y-6 animate-pulse">
            <div class="h-8 bg-gray-200 rounded w-3/4"></div>
            <div class="space-y-3">
              <div class="h-4 bg-gray-200 rounded"></div>
              <div class="h-4 bg-gray-200 rounded w-5/6"></div>
              <div class="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
            <div class="h-8 bg-gray-200 rounded w-1/4"></div>
            <div class="h-12 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      </div>

      <!-- No Details Found -->
      <div v-else-if="!product" class="max-w-5xl mx-auto text-center py-16">
        <p class="text-2xl font-semibold text-gray-500">No details found</p>
      </div>

      <!-- Product Details -->
      <div v-else class="max-w-5xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-xl overflow-hidden">
          <div class="relative h-[400px] md:h-[500px] bg-white p-6 flex items-center justify-center">
            <img
              :src="product.image"
              :alt="product.title"
              @error="handleImageError"
              class="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div class="p-8 space-y-6">
            <h2 class="text-3xl font-bold text-gray-900 leading-tight mb-2">
              {{ product.title }}
            </h2>

            <p class="text-lg text-gray-600 leading-relaxed">
              {{ product.description }}
            </p>

            <div class="pt-6 border-t border-gray-200">
              <div class="flex items-center justify-between mb-6">
                <span class="text-3xl font-bold text-blue-600">
                  ${{ product.price.toFixed(2) }}
                </span>
                <span class="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  In Stock
                </span>
              </div>

              <button
                @click="addProductToCart(product)"
                class="w-full bg-gradient-to-r from-blue-600 to-purple-700 text-white px-8 py-4 rounded-xl shadow-lg hover:from-blue-700 hover:to-purple-800 transition duration-300 ease-in-out transform hover:scale-102 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Toast from '@/components/Toast.vue';

export default {
  name: 'ProductDetails',
  components: {
    Toast,
  },
  data() {
    return {
      loading: true,
      error: null
    };
  },
  computed: {
    ...mapState({
      product: state => state.product
    })
  },
  methods: {
    ...mapActions(['fetchProduct', 'addToCart']),
    async addProductToCart(product) {
      await this.addToCart(product);
      this.$refs.toastRef.showToast('Item added to cart!');
    },

    handleImageError(event) {
      event.target.src = 'https://via.placeholder.com/400?text=Product+Image';
    },
  },
  created() {
    const productId = this.$route.params.id;
    this.$store.commit('setProduct', null);

    this.fetchProduct(productId)
      .then(() => {
        this.loading = false;
      })
      .catch(error => {
        this.error = 'Failed to load product details. Please try again.';
        this.loading = false;
        console.error('Product fetch error:', error);
      });
  }
}
</script>