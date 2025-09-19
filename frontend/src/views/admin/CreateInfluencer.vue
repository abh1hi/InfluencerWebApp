<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-6">Create New Influencer</h1>
    <form @submit.prevent="createInfluencer" class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="md:col-span-2">
          <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
          <input type="text" v-model="newInfluencer.name" id="name" required class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
        </div>
        <div class="md:col-span-2">
          <label for="niche" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Niche</label>
          <input type="text" v-model="newInfluencer.niche" id="niche" required class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
        </div>
        <div class="md:col-span-2">
          <label for="bio" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
          <textarea v-model="newInfluencer.bio" id="bio" rows="4" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"></textarea>
        </div>
        <div>
          <label for="instagram" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Instagram</label>
          <input type="text" v-model="newInfluencer.socials.instagram" id="instagram" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
        </div>
        <div>
          <label for="youtube" class="block text-sm font-medium text-gray-700 dark:text-gray-300">YouTube</label>
          <input type="text" v-model="newInfluencer.socials.youtube" id="youtube" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
        </div>
        <div>
          <label for="tiktok" class="block text-sm font-medium text-gray-700 dark:text-gray-300">TikTok</label>
          <input type="text" v-model="newInfluencer.socials.tiktok" id="tiktok" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
        </div>
      </div>
      <div class="mt-8">
        <button type="submit" class="inline-flex justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
          Create Influencer
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import apiClient from '@/services/api';
import { useRouter } from 'vue-router';

const router = useRouter();
const newInfluencer = ref({
  name: '',
  niche: '',
  bio: '',
  socials: {
    instagram: '',
    youtube: '',
    tiktok: '',
  },
});

const createInfluencer = async () => {
  try {
    await apiClient.post('/admin/influencers', newInfluencer.value);
    router.push('/admin/manage-influencers');
  } catch (error) {
    console.error('Failed to create influencer:', error);
  }
};
</script>