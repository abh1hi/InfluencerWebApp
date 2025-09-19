<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import apiClient from '@/services/api';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

const authStore = useAuthStore();
const router = useRouter();

const user = ref(null);
const loading = ref(true);

onMounted(async () => {
    if (!authStore.isAuthenticated) {
        router.push('/login');
        return;
    }

    try {
        const response = await apiClient.get('/users/profile');
        user.value = response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        authStore.logout();
        router.push('/login');
    } finally {
        loading.value = false;
    }
});
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <Navbar />
    <main class="py-10">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div v-if="loading" class="text-center text-gray-500 dark:text-gray-400">Loading profile...</div>
        <div v-else-if="user" class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <img class="h-20 w-20 rounded-full" :src="`https://ui-avatars.com/api/?name=${user.username}&background=random`" alt="" />
              </div>
              <div class="ml-5">
                <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white">{{ user.username }}</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ user.email }}</p>
              </div>
            </div>
          </div>
          <div class="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:p-0">
            <dl class="sm:divide-y sm:divide-gray-700">
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Role</dt>
                <dd class="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    :class="{
                      'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100': user.role === 'admin',
                      'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100': user.role === 'user',
                    }">
                    {{ user.role }}
                  </span>
                </dd>
              </div>
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Member since</dt>
                <dd class="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{{ new Date(user.createdAt).toLocaleDateString() }}</dd>
              </div>
            </dl>
          </div>
        </div>
        <div v-else class="text-center text-gray-500 dark:text-gray-400">
          <p>Failed to load profile. Please log in again.</p>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>