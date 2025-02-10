<template>
  <div class="w-full">
    <div class="mb-8">
      <!-- Center the tabs container -->
      <nav class="flex justify-center" aria-label="Tabs">
        <div class="flex space-x-8">
          <button
            v-for="(tab, index) in tabs"
            :key="index"
            @click="selectTab(index)"
            :class="[
              'whitespace-nowrap px-1 border-b-2 font-medium text-sm transition-colors duration-200  cursor-pointer',
              activeTab === index
                ? 'bg-gradient-to-r from-blue-600 to-purple-700 text-white px-4 py-2 rounded-lg hover:bg-blue-600  cursor-pointer'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
            :aria-current="activeTab === index ? 'page' : undefined"
          >
            {{ tab }}
          </button>
        </div>
      </nav>
    </div>
    <div class="mt-4">
      <slot :activeTab="activeTab"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Tabs',
    props: {
      tabs: {
        type: Array,
        required: true,
      },
      defaultTab: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {
        activeTab: this.defaultTab,
      };
    },
    methods: {
      selectTab(index) {
        this.activeTab = index;
        this.$emit('tab-changed', index);
      },
    },
  };
</script>