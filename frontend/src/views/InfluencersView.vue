<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import apiClient from '@/services/api';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import InfluencerCard from '@/components/InfluencerCard.vue';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';

const influencers = ref([]);
const loading = ref(true);
const error = ref(null);
const search = ref('');
const selectedNiche = ref('All');
const sortBy = ref('followers');
const showMoreFilters = ref(false);

const filterValues = ref({
  followers: { min: null, max: null },
  posts: { min: null, max: null },
  engagementRate: { min: null, max: null },
});

const maxValues = computed(() => {
  if (!influencers.value || influencers.value.length === 0) {
    return { followers: 1000000, posts: 5000, engagementRate: 100 };
  }
  const followers = Math.max(...influencers.value.map(i => i.followers || 0));
  const posts = Math.max(...influencers.value.map(i => i.posts || 0));
  const engagementRate = Math.max(...influencers.value.map(i => i.engagementRate || 0));
  return { followers, posts, engagementRate };
});

const niches = computed(() => {
  const allNiches = new Set(['All']);
  influencers.value.forEach(i => {
    if (i.niche) allNiches.add(i.niche);
  });
  return Array.from(allNiches);
});

const filteredInfluencers = computed(() => {
  let filtered = influencers.value;

  // Niche filter
  if (selectedNiche.value !== 'All') {
    filtered = filtered.filter(i => i.niche === selectedNiche.value);
  }

  // Search filter
  if (search.value) {
    filtered = filtered.filter(i =>
      i.name.toLowerCase().includes(search.value.toLowerCase())
    );
  }

  // Range filters
  const { followers, posts, engagementRate } = filterValues.value;
  if (followers.min !== null) {
    filtered = filtered.filter(i => (i.followers || 0) >= followers.min);
  }
  if (followers.max !== null) {
    filtered = filtered.filter(i => (i.followers || 0) <= followers.max);
  }
  if (posts.min !== null) {
    filtered = filtered.filter(i => (i.posts || 0) >= posts.min);
  }
  if (posts.max !== null) {
    filtered = filtered.filter(i => (i.posts || 0) <= posts.max);
  }
  if (engagementRate.min !== null) {
    filtered = filtered.filter(i => (i.engagementRate || 0) >= engagementRate.min);
  }
  if (engagementRate.max !== null) {
    filtered = filtered.filter(i => (i.engagementRate || 0) <= engagementRate.max);
  }

  // Sort the influencers
  if (sortBy.value) {
    filtered = [...filtered].sort((a, b) => {
      if (sortBy.value === 'followers') {
        return (b.followers || 0) - (a.followers || 0);
      }
      if (sortBy.value === 'posts') {
        return (b.posts || 0) - (a.posts || 0);
      }
      if (sortBy.value === 'engagementRate') {
        return (b.engagementRate || 0) - (a.engagementRate || 0);
      }
      return 0;
    });
  }
  
  return filtered;
});

function resetAdvancedFilters() {
  filterValues.value = {
    followers: { min: null, max: null },
    posts: { min: null, max: null },
    engagementRate: { min: null, max: null },
  };
  sortBy.value = 'followers';
}


onMounted(async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await apiClient.get('/influencers');
    influencers.value = response.data;
  } catch (err) {
    error.value = 'Failed to load influencers.';
    console.error('Error fetching influencers:', err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col">
    <Navbar />
    <main class="container mx-auto px-4 py-12 flex-grow">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-5xl">Find Your Next Star</h1>
        <p class="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Explore our curated list of top-tier influencers ready to elevate your brand.
        </p>
      </div>

      <!-- Filters -->
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-10 transition-all duration-300">
        <div class="flex flex-col md:flex-row gap-4 items-start">
          <!-- Search -->
          <div class="relative flex-grow w-full">
            <label for="search" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Search by Name</label>
            <input
              v-model="search"
              id="search"
              type="text"
              placeholder="e.g. Jane Doe"
              class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
            />
            <MagnifyingGlassIcon class="h-5 w-5 text-gray-400 absolute top-9 left-3" />
          </div>
          <!-- More Filters Button -->
          <div class="flex-shrink-0 pt-7">
            <button
              @click="showMoreFilters = !showMoreFilters"
              class="w-full md:w-auto px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              {{ showMoreFilters ? 'Hide' : 'More' }} Filters
            </button>
          </div>
        </div>

        <!-- Niche Filters -->
        <div class="mt-6">
            <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Filter by Niche</h3>
            <div class="flex items-center justify-start flex-wrap gap-2">
              <button
                v-for="niche in niches"
                :key="niche"
                @click="selectedNiche = niche"
                :class="[
                  'px-4 py-2 text-sm font-semibold rounded-full transition-colors',
                  selectedNiche === niche ? 'bg-primary-600 text-white shadow-md' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                ]"
              >
                {{ niche }}
              </button>
            </div>
        </div>

        <!-- Advanced Filters -->
        <div v-if="showMoreFilters" class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Sort By -->
            <div class="relative">
              <label for="sort" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sort By</label>
              <select
                v-model="sortBy"
                id="sort"
                class="w-full pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm appearance-none focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="followers">Followers</option>
                <option value="posts">Posts</option>
                <option value="engagementRate">Engagement</option>
              </select>
            </div>

            <!-- Followers Range -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Followers</label>
              <div class="flex gap-2">
                <input v-model.number="filterValues.followers.min" type="number" :placeholder="`Min (0)`" class="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md">
                <input v-model.number="filterValues.followers.max" type="number" :placeholder="`Max (${maxValues.followers})`" class="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md">
              </div>
            </div>

            <!-- Posts Range -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Posts</label>
              <div class="flex gap-2">
                <input v-model.number="filterValues.posts.min" type="number" :placeholder="`Min (0)`" class="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md">
                <input v-model.number="filterValues.posts.max" type="number" :placeholder="`Max (${maxValues.posts})`" class="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md">
              </div>
            </div>

            <!-- Engagement Rate Range -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Engagement Rate (%)</label>
              <div class="flex gap-2">
                <input v-model.number="filterValues.engagementRate.min" type="number" placeholder="Min (0)" class="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md">
                <input v-model.number="filterValues.engagementRate.max" type="number" :placeholder="`Max (${maxValues.engagementRate})`" class="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md">
              </div>
            </div>
          </div>
           <div class="mt-6 text-right">
              <button @click="resetAdvancedFilters" class="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">Reset Filters</button>
            </div>
        </div>
      </div>

      <!-- Grid -->
      <div v-if="loading" class="text-center text-gray-500 dark:text-gray-400">Loading...</div>
      <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
      <div v-else-if="filteredInfluencers.length > 0" class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <InfluencerCard
          v-for="influencer in filteredInfluencers"
          :key="influencer._id"
          :influencer="influencer"
        />
      </div>
      <div v-else class="text-center text-gray-500 dark:text-gray-400 py-16">
        <h3 class="text-2xl font-semibold">No Influencers Found</h3>
        <p>Try adjusting your search or filter criteria.</p>
      </div>
    </main>
    <Footer />
  </div>
</template>
