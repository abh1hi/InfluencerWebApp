<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-6">Manage Influencers</h1>

    <div class="mb-6">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Search by name or niche..."
        class="w-full max-w-md px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"
      />
    </div>

    <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
      <div v-if="loading" class="text-center dark:text-gray-300">Loading...</div>
      <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
      <div v-else>
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Niche</th>
              <th scope="col" class="relative px-6 py-3">
                <span class="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-if="filteredInfluencers.length === 0">
              <td colspan="3" class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-center">
                No influencers found matching your search.
              </td>
            </tr>
            <tr v-for="influencer in filteredInfluencers" :key="influencer._id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900 dark:text-white">{{ influencer.name }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500 dark:text-gray-300">{{ influencer.niche }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button @click="editInfluencer(influencer)" class="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-200">Edit</button>
                <button @click="deleteInfluencer(influencer._id)" class="ml-4 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import apiClient from '@/services/api';
import { useRouter } from 'vue-router';

const router = useRouter();
const influencers = ref([]);
const loading = ref(true);
const error = ref(null);
const searchTerm = ref('');

const filteredInfluencers = computed(() => {
  if (!searchTerm.value) {
    return influencers.value;
  }
  return influencers.value.filter(influencer =>
    influencer.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    (influencer.niche && influencer.niche.toLowerCase().includes(searchTerm.value.toLowerCase()))
  );
});

const fetchInfluencers = async () => {
  try {
    const response = await apiClient.get('/influencers');
    influencers.value = response.data;
  } catch (err) {
    error.value = 'Failed to load influencers.';
  } finally {
    loading.value = false;
  }
};

const deleteInfluencer = async (id) => {
  if (confirm('Are you sure you want to delete this influencer?')) {
    try {
      await apiClient.delete(`/admin/influencers/${id}`);
      fetchInfluencers();
    } catch (err) {
      alert('Failed to delete influencer.');
    }
  }
};

const editInfluencer = (influencer) => {
  // For now, we'll just log this. A modal or separate page would be better.
  console.log('Editing:', influencer);
  alert('Edit functionality to be implemented. Check console for data.');
};

onMounted(fetchInfluencers);
</script>