<template>
    <div class="bg-gray-50 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-90 bg-white p-8 rounded-xl shadow-lg">
        <h2 class="text-center text-2xl font-bold text-gray-800 mb-6">Sign Up</h2>
  
        <form @submit.prevent="handleSignUp">
          <!-- Full Name -->
          <div class="mb-4">
            <label class="block text-gray-700 font-medium mb-2" for="fullName">Full Name</label>
            <input 
              v-model="fullName"
              type="text"
              id="fullName"
              placeholder="Enter your full name" 
              class="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 outline-none"
            />
          </div>
  
          <!-- Email -->
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
  
          <!-- Password -->
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
  
          <!-- Error Message -->
          <div v-if="errorMessage" class="text-red-500 p-1">
            {{ errorMessage }}
          </div>
  
          <!-- Sign Up Button -->
          <button 
            type="submit"
            class="w-full bg-gradient-to-r from-blue-600 to-purple-700 text-white py-2 rounded-lg hover:from-blue-700 hover:to-purple-800 transition duration-200"
            :disabled="loading"
          >
            {{ loading ? 'Signing up...' : 'Sign Up' }}
          </button>
        </form>
  
        <p class="text-center text-gray-600 mt-4">
          Already have an account? 
          <router-link to="/login" class="text-blue-600 hover:underline">Login</router-link>
        </p>
      </div>
    </div>
  </template>
  
  <script>
    import { mapActions } from 'vuex';
  
    export default {
      name: 'SignUp',
      data() {
        return {
          fullName: '',
          email: '',
          password: '',
          errorMessage: null,
          loading: false,
        };
      },
      methods: {
        ...mapActions(['createAccount']),
  
        async handleSignUp() {
          this.errorMessage = '';
          this.loading = true;
  
          if (!this.fullName || !this.email || !this.password) {
            this.errorMessage = 'All fields are required';
            this.loading = false;
            return;
          }
  
          try {
            const response = await this.createAccount({
              fullName: this.fullName,
              email: this.email,
              password: this.password
            });
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