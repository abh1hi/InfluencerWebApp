<script setup>
import {
  HomeIcon,
  UserPlusIcon,
  UsersIcon,
  DocumentPlusIcon,
  ArrowLeftOnRectangleIcon,
  DocumentTextIcon,
  ArrowUpTrayIcon,
} from '@heroicons/vue/24/outline'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon },
  { name: 'Create Influencer', href: '/admin/create-influencer', icon: UserPlusIcon },
  { name: 'Manage Influencers', href: '/admin/manage-influencers', icon: UsersIcon },
  { name: 'Create Blog', href: '/admin/create-blog', icon: DocumentPlusIcon },
  { name: 'Manage Blogs', href: '/admin/manage-blogs', icon: DocumentTextIcon },
  { name: 'Bulk Upload', href: '/admin/bulk-upload', icon: ArrowUpTrayIcon },
]

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<template>
  <div class="flex h-screen bg-gray-100 dark:bg-gray-900 font-sans">
    <!-- Sidebar -->
    <aside class="w-64 flex-shrink-0 bg-gray-800 dark:bg-gray-900 text-white flex flex-col">
      <div class="h-20 flex items-center justify-center bg-gray-900 dark:bg-black">
        <h1 class="text-2xl font-bold text-white">Admin Panel</h1>
      </div>
      <nav class="flex-1 px-2 py-4 space-y-2">
        <router-link
          v-for="item in navigation"
          :key="item.name"
          :to="item.href"
          custom
          v-slot="{ href, navigate, isExactActive }"
        >
          <a
            :href="href"
            @click="navigate"
            class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200"
            :class=" [
              isExactActive
                ? 'bg-primary-600 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            ]"
          >
            <component :is="item.icon" class="h-6 w-6 mr-3" aria-hidden="true" />
            {{ item.name }}
          </a>
        </router-link>
      </nav>
      <div class="p-4 border-t border-gray-700 dark:border-gray-800">
        <button
          @click="handleLogout"
          class="w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
        >
          <ArrowLeftOnRectangleIcon class="h-6 w-6 mr-3" />
          Logout
        </button>
      </div>
    </aside>

    <!-- Main content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-800">
        <div class="container mx-auto px-6 py-8">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>