<template>
  <div class="bg-gray-50 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-90 bg-white p-8 rounded-xl shadow-lg">
      <h2 class="text-center text-2xl font-bold text-gray-800 mb-6">Login</h2>

      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2" for="email">Email</label>
          <input 
            v-model="email"
            type="email" 
            id="email"
            placeholder="Enter your email" 
            class="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 outline-none"
          />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2" for="password">Password</label>
          <input 
            v-model="password"
            type="password" 
            id="password"
            placeholder="Enter your password"
            class="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 outline-none"
          />
        </div>

        <div v-if="errorMessage" class="text-red-500 p-1">
          {{ errorMessage }}
        </div>

        <button 
          type="submit"
          class="w-full bg-gradient-to-r from-blue-600 to-purple-700 text-white py-2 rounded-lg hover:from-blue-700 hover:to-purple-800 transition duration-200"
          :disabled="loading"
        >
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>

      <p class="text-center text-gray-600 mt-4">
        Don't have an account? 
        <router-link to="/signup" class="text-blue-600 hover:underline">Sign Up</router-link>
      </p>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'Login',
    data() {
      return {
        email: '',
        password: '',
        errorMessage: null,
        loading: false,
      };
    },
    computed: {
      ...mapGetters(['isAuthenticated', 'user']),
    },
    methods: {
      ...mapActions(['userLogin']),

      async handleLogin() {
        this.errorMessage = '';
        this.loading = true;

        if (!this.email || !this.password) {
          this.errorMessage = 'Email and password are required';
          this.loading = false;
          return;
        }

        try {
          const response = await this.userLogin({ email: this.email, password: this.password });

          if (response.success) {
            this.$router.push('/');
          } else {
            this.errorMessage = response.message;
          }
        } catch (error) {
          this.errorMessage = error.message || 'Something went wrong!';
        } finally {
          this.loading = false;
        }
      }
    }
  };
</script>