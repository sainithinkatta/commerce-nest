<template>
    <nav class="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-purple-700 shadow-lg">
        <div class="container mx-auto px-4 py-3 flex items-center justify-between">
        <!-- Logo Section -->
        <div class="flex items-center space-x-4">
            <router-link to="/" class="flex items-center space-x-2 group">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white group-hover:text-gray-200 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            <span class="text-2xl font-bold text-white tracking-tight">Commerce Nest</span>
            </router-link>
        </div>

        <!-- Navigation Links -->
        <div class="hidden md:flex items-center space-x-6">
            <router-link 
            to="/" 
            class="text-white hover:text-gray-200 transition-colors font-medium text-sm"
            >
            Home
            </router-link>

            <router-link 
            to="/categories" 
            class="text-white hover:text-gray-200 transition-colors font-medium text-sm"
            >
            Categories
            </router-link>
        </div>

        <!-- Search and Actions Section -->
        <div class="flex items-center space-x-4">
            
            <!-- Search bar  -->
             <SearchBar />

            <!-- Action Buttons -->
            <div class="flex items-center space-x-3">

                <!-- Cart Button -->
                <div class="relative">
                    <button 
                    @click="toggleCart"
                    class="text-white hover:bg-white/20 p-2 rounded-full transition-colors relative group cursor-pointer"
                    >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        class="h-6 w-6 group-hover:scale-110 transition-transform" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path 
                        stroke-linecap="round" 
                        stroke-linejoin="round" 
                        stroke-width="2" 
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
                        />
                    </svg>
                    
                    <!-- Cart Count Badge -->
                    <span 
                        v-if="$store.getters.cartCount > 0"
                        class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full 
                                h-5 w-5 flex items-center justify-center animate-pulse"
                        >
                        {{ $store.getters.cartCount }}
                    </span>
                    </button>
                </div>

                <!-- User Account -->
                <div class="relative flex items-center">
                    <button 
                        @click="handleUserMenu"
                        class="text-white hover:bg-white/20 p-2 rounded-full transition-colors group"
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            class="h-6 w-6 group-hover:scale-110 transition-transform" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path 
                                stroke-linecap="round" 
                                stroke-linejoin="round" 
                                stroke-width="2" 
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                            />
                        </svg>
                    </button>

                    <span 
                        v-if="isAuthenticated" 
                        class="text-2xl font-bold text-white tracking-tight"
                    >
                        {{ user.fullName }}
                    </span>

                    <div 
                        v-if="toggleUserMenu" 
                        class="absolute right-0 top-full mt-1 w-23 bg-white rounded-md shadow-lg py-1 z-50"
                    >
                        <!-- Not Logged In Options -->
                        <template v-if="!isAuthenticated">
                            <router-link 
                                to="/login" 
                                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                @click="toggleUserMenu = false"
                            >
                                Login
                            </router-link>

                            <hr class="border-t border-gray-200 my-1">

                            <router-link 
                                to="/signup" 
                                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                @click="toggleUserMenu = false"
                            >
                                Sign Up
                            </router-link>
                        </template>
                        
                        <!-- Logged In Options -->
                        <template v-else>
                            <button 
                                @click="handleLogout" 
                                class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            >
                                Logout
                            </button>
                        </template>
                    </div>

                    <!-- Toast Component -->
                    <Toast ref="toastRef" />
                </div>
            </div>
        </div>
        </div>
    </nav>
</template>
  
<script>
import SearchBar from './SearchBar.vue';
import Toast from '@/components/Toast.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    name: "Navbar",
    components: {
        SearchBar,
        Toast
    },
    data() {
        return {
            toggleUserMenu: false,
        }
    },
    computed: {
      ...mapGetters(['isAuthenticated', 'user']),
    },
    methods: {
        ...mapActions(['logout']),

        async handleLogout() {
            this.errorMessage = ''; 

            try {
                const response = await this.logout();

                if (response.success) {
                    this.$router.push('/');
                    this.$refs.toastRef.showToast('Logged out Successfully');
                } else {
                    this.errorMessage = response.message;
                }
            } catch (error) {
                this.errorMessage = error.message || 'Something went wrong!';
            } finally {
                this.toggleUserMenu = false;
            }
        },
        toggleCart() {
            this.$router.push({ name: 'Cart' });
        },
        handleUserMenu () {
            this.toggleUserMenu = !this.toggleUserMenu
        }
    }
}
</script>