<template>
    <div 
      v-if="visible" 
      class="fixed top-20 right-5 bg-gradient-to-r from-blue-600 to-purple-700 text-white px-6 py-3 rounded-lg shadow-lg transition-opacity duration-500"
    >
      {{ message }}
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        visible: false,
        message: '',
      };
    },
    methods: {
      showToast(msg) {
        this.message = msg;
        this.visible = true;
        setTimeout(() => {
          this.visible = false;
        }, 3000);
      },
    },
  };
  </script>
  
  <style scoped>
  .fixed {
    z-index: 50;
  }
  </style>
  