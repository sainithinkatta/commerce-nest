<template>
  <div class="cart-page px-4 py-8 max-w-7xl mx-auto bg-gray-50 min-h-screen mt-15">
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
                  class="w-8 h-8 flex items-center justify-center bg-white rounded-md hover:bg-gray-100 border border-gray-200 transition duration-200 cursor-pointer"
                >
                  <span class="text-gray-600">-</span>
                </button>
                <span class="w-10 text-center font-medium text-gray-900">{{ item.quantity }}</span>
                <button 
                  @click="increaseQuantity(item.id)"
                  class="w-8 h-8 flex items-center justify-center bg-white rounded-md hover:bg-gray-100 border border-gray-200 transition duration-200 cursor-pointer"
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
              class="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors duration-200 w-full md:w-auto cursor-pointer"
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
          <span class="text-2xl font-bold text-gray-900">Total Amount ${{ totalAmount }}</span>
        </div>
        
        <div class="flex justify-end pt-2">
          <button 
            @click="handleCheckout"
            class="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-300 font-medium shadow-sm hover:shadow-md cursor-pointer"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>

    <!-- Empty Cart Message -->
    <div v-else class="flex flex-col items-center justify-center py-16 bg-white rounded-xl shadow-md">
      <p class="text-xl text-gray-500 mb-4">Your cart is empty</p>
      <button 
        class="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300 cursor-pointer"
        @click="$router.push('/')" 
      >
        Continue Shopping
      </button>
    </div>
    
    <!-- Purchase Success Modal -->
    <div v-if="purchaseStatus.success" class="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl p-6 max-w-md w-full shadow-xl">
        <h3 class="text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-700 mb-4">Purchase Successful!</h3>
        <p class="text-gray-700 mb-6">
          Purchase information has been sent to your email! Check your inbox for details.
        </p>
        <div class="flex justify-end">
          <button 
            @click="handlePurchaseModal"
            class="bg-gradient-to-r from-blue-600 to-purple-700 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import emailjs from '@emailjs/browser';

  export default {
    name: 'Cart',
    data: () => ({
      purchaseStatus: {
        loading: false,
        success: false,
        error: null
      }
    }),
    computed: {
      ...mapGetters(['isAuthenticated', 'user', 'cart']),
      
      formattedCartItems() {
        return this.cart.map(item => ({
          name: item.title,
          quantity: item.quantity,
          price: item.price,
          subtotal: (item.price * item.quantity).toFixed(2)
        }));
      },
      
      totalAmount() {
        return this.cart.reduce((total, item) => 
          total + (item.quantity * item.price), 0
        ).toFixed(2);
      }
    },
    mounted() {
      emailjs.init("YOUR_USER_ID"); // Replace with your actual EmailJS user ID
    },
    methods: {
      ...mapActions(['removeFromCart', 'updateQuantity']),

      removeItemFromCart(productId) {
        this.$store.dispatch('removeFromCart', productId);
      },
      increaseQuantity(productId) {
        this.$store.dispatch('updateQuantity', { productId, change: 1 });
      },
      decreaseQuantity(productId) {
        this.$store.dispatch('updateQuantity', { productId, change: -1 });
      },

      handlePurchaseModal() {
        this.purchaseStatus.success = !this.purchaseStatus.success;
      },
      
      handleCheckout() {
        if (!this.isAuthenticated) {
          this.$router.push({ name: 'Login' });
          return;
        }
        
        this.purchaseStatus.loading = true;
        this.sendPurchaseEmail();
      },
      
      sendPurchaseEmail() {  
        // Generate timestamp.
        const timestamp = new Date().toLocaleString();
        
        // Preparing cart data for email.
        const cartItemsForEmail = this.cart.map(item => ({
          name: item.title,
          quantity: item.quantity,
          price: item.price,
          subtotal: (item.price * item.quantity).toFixed(2)
        }));
        
        // Generating items list as HTML for the email.
        const itemsList = cartItemsForEmail.map(item => 
          `- ${item.name} x ${item.quantity}: $${item.subtotal}`
        ).join('<br>');
        
        // Preparing EmailJS template parameters.
        const templateParams = {
          to_email: this.user.email,
          to_name: this.user.fullName,
          items_list: itemsList,
          total_amount: this.totalAmount,
          order_date: timestamp
        };

        // Sending email using EmailJS.
        emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          templateParams,
          import.meta.env.VITE_EMAILJS_USER_ID
        )
        .then(() => {
          this.handlePurchaseModal();
          
          // Clear cart
          this.$store.commit('setCart', []);
        })
        .catch(error => {
          console.error('Error sending email:', error);
        });
      }
    }
  };
</script>