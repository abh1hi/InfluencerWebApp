<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-6">Bulk Upload Influencers</h1>
    <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
      <div class="mb-6">
        <label for="file-upload" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Upload JSON File
        </label>
        <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
          <div class="space-y-1 text-center">
            <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <div class="flex text-sm text-gray-600 dark:text-gray-400">
              <label for="file-upload" class="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                <span>Upload a file</span>
                <input id="file-upload" name="file-upload" type="file" @change="handleFileUpload" accept=".json" class="sr-only">
              </label>
              <p class="pl-1">or drag and drop</p>
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              JSON up to 10MB
            </p>
          </div>
        </div>
        <p v-if="fileName" class="mt-2 text-sm text-gray-500 dark:text-gray-400">
          File: {{ fileName }}
        </p>
      </div>

      <div v-if="message" :class="[
        'p-4 mb-4 text-sm rounded-lg',
        isError ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300' : 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
      ]" role="alert">
        {{ message }}
      </div>

      <div class="mt-8">
        <button @click="submitBulkUpload" :disabled="!influencers.length || loading" class="inline-flex justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed">
          <span v-if="loading">Uploading...</span>
          <span v-else>Upload Influencers</span>
        </button>
      </div>

      <div v-if="influencers.length" class="mt-8">
        <h3 class="text-lg font-medium text-gray-800 dark:text-white mb-4">Preview Data ({{ influencers.length }} records)</h3>
        <div class="max-h-96 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Username</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Followers</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Posts</th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="(influencer, index) in influencers.slice(0, 10)" :key="index">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{{ influencer.name }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{{ influencer.username }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{{ formatFollowers(influencer.followers) }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{{ influencer.post_c }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p v-if="influencers.length > 10" class="text-sm text-gray-500 dark:text-gray-400 mt-2">
          ... and {{ influencers.length - 10 }} more records.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import apiClient from '@/services/api';

const influencers = ref([]);
const fileName = ref('');
const message = ref('');
const isError = ref(false);
const loading = ref(false);

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  fileName.value = file.name;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (Array.isArray(data)) {
        influencers.value = data;
        message.value = `Successfully parsed ${data.length} records from ${file.name}.`;
        isError.value = false;
      } else {
        throw new Error('JSON file is not an array.');
      }
    } catch (error) {
      message.value = `Error parsing JSON file: ${error.message}`;
      isError.value = true;
      influencers.value = [];
      fileName.value = '';
    }
  };
  reader.readAsText(file);
};

const submitBulkUpload = async () => {
  if (!influencers.value.length) {
    message.value = 'No data to upload.';
    isError.value = true;
    return;
  }

  loading.value = true;
  message.value = '';
  isError.value = false;

  try {
    const response = await apiClient.post('/admin/influencers/bulk', { influencers: influencers.value });
    message.value = response.data.message || 'Bulk upload successful!';
    isError.value = false;
    influencers.value = [];
    fileName.value = '';
  } catch (error) {
    message.value = `Upload failed: ${error.response?.data?.message || error.message}`;
    isError.value = true;
  } finally {
    loading.value = false;
  }
};

const formatFollowers = (num) => {
  if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1)}B`;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num;
};
</script>
