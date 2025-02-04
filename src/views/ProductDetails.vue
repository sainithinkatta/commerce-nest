<template>
  <div v-if="product" class="max-w-5xl mx-auto py-12 px-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div>
        <img 
          :src="product.image" 
          :alt="product.title" 
          class="w-full h-auto rounded-xl shadow-md object-cover"
        />
      </div>
      <div class="space-y-6">
        <h2 class="text-4xl font-extrabold text-gray-900 leading-tight">
          {{ product.title }}
        </h2>
        <p class="text-lg text-gray-700 leading-relaxed">
          {{ product.description }}
        </p>
        <p class="text-3xl font-bold text-blue-600">
          ${{ product.price.toFixed(2) }}
        </p>
        <button 
          @click="addToCart(product)" 
          class="mt-4 bg-blue-600 text-white px-8 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
  
  <div v-else class="text-center py-12">
    <p class="text-lg text-gray-500">Loading product details...</p>
  </div>
</template>
  
  <script>
  import { mapState, mapActions } from 'vuex';
  
  export default {
    name: 'ProductDetails',
    computed: {
      ...mapState({
        product: state => state.product
      })
    },
    methods: {
      ...mapActions(['fetchProduct']),
      addToCart(product) {
        console.log('Added to cart:', product);
      }
    },
    created() {
      const productId = this.$route.params.id;
      this.fetchProduct(productId);
    }
  }
  </script>  