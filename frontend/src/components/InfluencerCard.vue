<script setup>
defineProps({
  influencer: {
    type: Object,
    required: true,
  },
});

const formatFollowers = (num) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num;
};
</script>

<template>
  <router-link :to="`/influencers/${influencer._id}`" class="group block bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-xl dark:hover:shadow-primary-500/20 transition-shadow duration-300 overflow-hidden">
    <div class="relative">
      <img
        :src="influencer.image || 'https://via.placeholder.com/400x400'"
        :alt="influencer.name"
        class="h-48 w-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
    </div>
    <div class="p-4">
      <h3 class="text-lg font-bold text-gray-900 dark:text-white truncate">{{ influencer.name }}</h3>
      <p class="text-sm text-primary-600 dark:text-primary-400 font-semibold">{{ influencer.niche }}</p>
      <div class="mt-3 flex justify-between items-center text-sm text-gray-600 dark:text-gray-300">
        <div class="flex flex-col items-center">
          <span class="font-bold">{{ formatFollowers(influencer.followers) }}</span>
          <span class="text-xs text-gray-500 dark:text-gray-400">Followers</span>
        </div>
        <div class="flex flex-col items-center">
          <span class="font-bold">{{ influencer.engagementRate }}%</span>
          <span class="text-xs text-gray-500 dark:text-gray-400">Engagement</span>
        </div>
        <div class="flex flex-col items-center">
          <span class="font-bold">{{ influencer.posts }}</span>
          <span class="text-xs text-gray-500 dark:text-gray-400">Posts</span>
        </div>
      </div>
    </div>
  </router-link>
</template>
