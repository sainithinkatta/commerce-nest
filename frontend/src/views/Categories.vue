<template>
  <div class="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-16">
    <!-- Loading and Error States -->
    <div v-if="loading" class="text-center">Loading categories...</div>
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
    <div v-else>
      <!-- Tabs Component -->
      <Tabs :tabs="categories" @tab-changed="handleTabChange">
        <template #default="{ activeTab }">
          <div v-if="categories[activeTab]"></div>
        </template>
      </Tabs>

      <!-- Toast Component -->
      <Toast ref="toastRef" />

      <!-- Empty State -->
      <div v-if="!loading && categoryItems.length === 0" class="text-center text-gray-500 text-lg py-10">
        No products found
      </div>

      <!-- Products -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div 
          v-for="product in categoryItems" 
          :key="product.id" 
          class="block bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
        >
          <router-link :to="`/product/${product.id}`" class="block">
            <div class="relative overflow-hidden h-64 flex items-center justify-center">
              <img 
                :src="product.image"
                :alt="product.title" 
                class="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          </router-link>
          
          <div class="p-5">
            <router-link :to="`/product/${product.id}`">
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
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import Tabs from '../components/Tabs.vue';
  import Toast from '@/components/Toast.vue';

  export default {
    name: 'Categories',
    components: {
      Tabs,
      Toast
    },
    data() {
      return {
        loading: true,
        error: null,
        activeCategory: ''
      };
    },
    computed: {
      ...mapState({
        categories: state => state.categories,
        categoryItems: state => state.categoryItems
      })
    },
    methods: {
      ...mapActions(['fetchCategories', 'fetchCategoryItems', 'addToCart']),

      handleTabChange(index) {
        this.activeCategory = this.categories[index];
        this.fetchCategoryItemsList();
      },

      async fetchCategoryItemsList() {
        try {
          await this.fetchCategoryItems(this.activeCategory);
          this.loading = false;
        } catch (error) {
          this.error = 'Failed to load category item details. Please try again.';
          this.loading = false;
          console.error('Product fetch error:', error);
        }
      },

      async addProductToCart(product) {
        await this.addToCart(product);
        this.$refs.toastRef.showToast('Item added to cart!');
      }
    },
    async created() {
      try {
        await this.fetchCategories();
        this.loading = false;

        if (this.categories.length > 0) {
          this.activeCategory = this.categories[0];
          await this.fetchCategoryItemsList();
        }
      } catch (error) {
        this.error = 'Failed to load categories';
        this.loading = false;
        console.error('Categories fetch error:', error);
      }
    }
  };
</script>