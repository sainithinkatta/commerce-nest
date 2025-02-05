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
            <!-- Search Bar -->
            <div class="relative hidden md:block">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                </svg>
            </div>

            <input 
                type="text" 
                placeholder="Search products..." 
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full bg-white text-sm 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                        transition-all duration-300 ease-in-out"
            />
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center space-x-3">

            <!-- Cart Button -->
            <div class="relative">
                <button 
                @click="toggleCart"
                class="text-white hover:bg-white/20 p-2 rounded-full transition-colors relative group"
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
            <div class="relative">
                <button 
                @click="toggleUserMenu"
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
            </div>
            </div>
        </div>
        </div>
    </nav>
</template>
  
<script>
export default {
    name: "Navbar",
    methods: {
        toggleCart() {
            this.$router.push({ name: 'Cart' });
        }
    }
}
</script>