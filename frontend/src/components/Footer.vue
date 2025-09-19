<script setup>
import { isDark, toggleDark } from '@/composables/useTheme';
import { SunIcon, MoonIcon } from '@heroicons/vue/24/solid';
</script>

<template>
  <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
    <div class="mx-auto max-w-7xl overflow-hidden px-6 py-12 sm:py-16 lg:px-8">
      <nav class="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
        <div class="pb-6">
          <router-link to="/influencers" class="text-sm leading-6 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Influencers</router-link>
        </div>
        <div class="pb-6">
          <router-link to="/blogs" class="text-sm leading-6 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Blogs</router-link>
        </div>
        <div class="pb-6">
          <a href="#" class="text-sm leading-6 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">About Us</a>
        </div>
        <div class="pb-6">
          <a href="#" class="text-sm leading-6 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Contact</a>
        </div>
      </nav>
      <div class="mt-10 flex justify-center">
        <button @click="toggleDark()" class="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
          <span class="sr-only">Toggle theme</span>
          <SunIcon v-if="isDark" class="h-6 w-6" />
          <MoonIcon v-else class="h-6 w-6" />
        </button>
      </div>
      <p class="mt-10 text-center text-xs leading-5 text-gray-500 dark:text-gray-400">&copy; 2025 InfluencerHub. All rights reserved.</p>
    </div>
  </footer>
</template>
