<script setup>
import { isDark } from '@/composables/useTheme';
</script>

<template>
  <div :class="{ 'dark': isDark }" class="bg-gray-50 dark:bg-gray-900 font-sans text-gray-900 dark:text-gray-200 min-h-screen">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>