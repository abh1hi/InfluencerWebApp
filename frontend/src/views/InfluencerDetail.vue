<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import apiClient from '@/services/api';
import {
  ArrowLeftIcon,
} from '@heroicons/vue/24/outline';

const route = useRoute();
const influencer = ref(null);
const loading = ref(true);

onMounted(async () => {
  try {
    const response = await apiClient.get(`/influencers/${route.params.id}`);
    influencer.value = response.data;
  } catch (error) {
    console.error('Error fetching influencer:', error);
  } finally {
    loading.value = false;
  }
});

const formatFollowers = (num) => {
  if (!num) return 'N/A';
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

const socialLinks = computed(() => {
  if (!influencer.value || !influencer.value.socials) return [];
  const socials = influencer.value.socials;
  const links = [];
  if (socials.instagram) links.push({ name: 'Instagram', url: `https://instagram.com/${socials.instagram}`, icon: 'fab fa-instagram' });
  if (socials.youtube) links.push({ name: 'YouTube', url: `https://youtube.com/c/${socials.youtube}`, icon: 'fab fa-youtube' });
  if (socials.tiktok) links.push({ name: 'TikTok', url: `https://tiktok.com/@${socials.tiktok}`, icon: 'fab fa-tiktok' });
  if (socials.twitter) links.push({ name: 'Twitter', url: `https://twitter.com/${socials.twitter}`, icon: 'fab fa-twitter' });
  return links;
});
</script>

<template>
  <div class="bg-gray-100 dark:bg-gray-900 min-h-screen">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-6">
        <router-link
          to="/influencers"
          class="inline-flex items-center text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          <ArrowLeftIcon class="h-4 w-4 mr-2" />
          Back to Influencers
        </router-link>
      </div>

      <!-- Loading Skeleton -->
      <div v-if="loading" class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md max-w-4xl mx-auto">
        <div class="animate-pulse md:flex space-x-8">
          <div class="md:w-1/3 flex justify-center items-center">
            <div class="rounded-full bg-gray-300 dark:bg-gray-700 h-48 w-48"></div>
          </div>
          <div class="md:w-2/3 space-y-6 py-1 mt-6 md:mt-0">
            <div class="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
            <div class="h-10 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
            <div class="space-y-3">
              <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
            </div>
            <div class="grid grid-cols-3 gap-4 pt-4">
                <div class="h-20 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                <div class="h-20 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                <div class="h-20 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Influencer Details -->
      <div v-else-if="influencer" class="max-w-4xl mx-auto">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div class="md:flex">
            <!-- Left Column: Image & Socials -->
            <div class="md:w-1/3 p-6 bg-gray-50 dark:bg-gray-800/50 flex flex-col items-center justify-center">
              <img
                :src="influencer.image || 'https://via.placeholder.com/300'"
                :alt="influencer.name"
                class="w-48 h-48 rounded-full object-cover shadow-xl border-4 border-white dark:border-gray-700"
              />
              <div class="mt-6 text-center">
                <h2 class="text-xl font-semibold text-gray-800 dark:text-white">Connect</h2>
                <div class="flex justify-center gap-4 mt-3">
                  <a
                    v-for="social in socialLinks"
                    :key="social.name"
                    :href="social.url"
                    target="_blank"
                    class="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    :aria-label="social.name"
                  >
                    <i :class="social.icon" class="text-2xl"></i>
                  </a>
                </div>
              </div>
            </div>

            <!-- Right Column: Details -->
            <div class="md:w-2/3 p-8">
              <span class="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider">{{ influencer.niche }}</span>
              <h1 class="text-4xl font-bold text-gray-900 dark:text-white mt-1">{{ influencer.name }}</h1>
              <p class="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">{{ influencer.bio }}</p>

              <!-- Stats -->
              <div class="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">Key Metrics</h3>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
                  <div class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg flex flex-col items-center justify-center">
                    <i class="fas fa-users text-2xl text-primary-500 dark:text-primary-400 mb-2"></i>
                    <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ formatFollowers(influencer.followers) }}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Followers</p>
                  </div>
                  <div class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg flex flex-col items-center justify-center">
                    <i class="fas fa-heart text-2xl text-red-500 mb-2"></i>
                    <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ influencer.engagementRate }}%</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Engagement</p>
                  </div>
                  <div class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg flex flex-col items-center justify-center">
                    <i class="fas fa-pencil-alt text-2xl text-blue-500 mb-2"></i>
                    <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ influencer.posts || 'N/A' }}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Posts</p>
                  </div>
                </div>
              </div>
              
              <!-- Contact CTA -->
              <div class="mt-8 text-center">
                <a :href="`mailto:${influencer.email || ''}`" class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 shadow-sm">
                  <i class="fas fa-envelope mr-2"></i>
                  Contact for Collaboration
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Not Found -->
      <div v-else class="text-center text-gray-500 dark:text-gray-400 text-lg">
        <p>Influencer not found.</p>
      </div>
    </div>
  </div>
</template>
