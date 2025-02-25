<template>
  <div class="relative search-container mr-15">
    <!-- Search Icon -->
    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <svg class="h-5 w-5 text-white/60" fill="currentColor" viewBox="0 0 20 20">
        <path
          fill-rule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clip-rule="evenodd"
        />
      </svg>
    </div>

    <!-- Search Input -->
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search products..."
      @input="handleSearch"
      @focus="showResults = true"
      @click="showResults = true"
      class="w-75 pl-10 pr-3 py-2 bg-white/10 border border-white/20 rounded-full text-white placeholder-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-300"
    />

    <!-- Search Results Dropdown -->
    <div
      v-show="showResults && searchQuery"
      class="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-100"
    >
      <ul v-if="filteredProducts.length > 0" class="py-2 max-h-96 overflow-auto">
        <li
          v-for="product in filteredProducts"
          :key="product.id"
          @click="selectProduct(product)"
          class="px-4 py-2 hover:bg-gray-50 cursor-pointer"
        >
          <div class="flex items-center">
            <img
              :src="product.image"
              :alt="product.title"
              class="w-10 h-10 object-contain rounded"
              @error="handleImageError"
            />
            <div class="ml-3">
              <div class="text-sm font-medium text-gray-900 truncate">
                {{ product.title }}
              </div>
              <div class="text-sm text-gray-500">
                ${{ product.price.toFixed(2) }}
              </div>
            </div>
          </div>
        </li>
      </ul>

      <!-- No Results Message -->
      <div v-else class="p-4 text-center text-gray-500">
        No products found
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from '@vue/runtime-core';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { debounce } from 'lodash';

export default {
  name: 'SearchBar',
  setup() {
    const store = useStore();
    const router = useRouter();
    const searchQuery = ref('');
    const showResults = ref(false);
    const MAX_DROPDOWN_RESULTS = 5;

    // Get all products from Vuex store
    const allProducts = computed(() => store.state.products);

    // Filtered products for dropdown
    const filteredProducts = computed(() => {
      if (!searchQuery.value) return [];

      const query = searchQuery.value.toLowerCase();
      return allProducts.value
        .filter(
          (product) =>
            product.title.toLowerCase().includes(query)
        )
        .slice(0, MAX_DROPDOWN_RESULTS);
    });

    // Debounced search handler
    const handleSearch = debounce(() => {
      store.commit('setSearchQuery', searchQuery.value);
    }, 300);

    // Handle product selection from dropdown
    const selectProduct = (product) => {
      router.push(`/product/${product.id}`);
      searchQuery.value = '';
      showResults.value = false;
    };

    // Handle image loading errors
    const handleImageError = (event) => {
      event.target.src = 'https://via.placeholder.com/150?text=Product+Image';
    };

    // Close results when clicking outside
    const handleClickOutside = (event) => {
      const container = event.target.closest('.search-container');
      if (!container) {
        showResults.value = false;
      }
    };

    // Attach and detach click outside listener
    onMounted(() => {
      document.addEventListener('click', handleClickOutside);
    });

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside);
    });

    return {
      searchQuery,
      showResults,
      filteredProducts,
      handleSearch,
      selectProduct,
      handleImageError,
    };
  },
};
</script>