<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-2">Admin Dashboard</h1>
    <p class="text-gray-600 dark:text-gray-300 mb-8">Welcome to the admin panel. Here is an overview of your content.</p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold text-gray-700 dark:text-white mb-4">Content Statistics</h2>
        <div v-if="loading" class="text-center text-gray-500 dark:text-gray-400">Loading stats...</div>
        <div v-if="error" class="text-center text-red-500">{{ error }}</div>
        <div v-if="stats" class="h-80">
          <Bar :data="chartData" :options="chartOptions" />
        </div>
      </div>
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col justify-center">
         <h2 class="text-xl font-semibold text-gray-700 dark:text-white mb-4">Summary</h2>
         <div v-if="loading" class="text-center text-gray-500 dark:text-gray-400">Loading summary...</div>
         <div v-if="error" class="text-center text-red-500">{{ error }}</div>
         <div v-if="stats" class="space-y-4">
            <div class="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div class="text-3xl font-bold text-primary-600 dark:text-primary-400">{{ stats.influencers.total }}</div>
              <div class="ml-4 text-lg text-gray-600 dark:text-gray-300">Total Influencers</div>
            </div>
            <div class="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div class="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{{ stats.blogs.total }}</div>
              <div class="ml-4 text-lg text-gray-600 dark:text-gray-300">Total Blogs</div>
            </div>
         </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import api from '../../services/api';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const stats = ref(null);
const loading = ref(true);
const error = ref(null);

const chartData = computed(() => {
  if (!stats.value) {
    return {
      labels: [],
      datasets: [],
    };
  }
  return {
    labels: ['Total Count'],
    datasets: [
      {
        label: 'Influencers',
        backgroundColor: '#4F46E5',
        data: [stats.value.influencers.total],
      },
      {
        label: 'Blogs',
        backgroundColor: '#10B981',
        data: [stats.value.blogs.total],
      },
    ],
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: document.documentElement.classList.contains('dark') ? 'white' : '#333',
      }
    },
    title: {
      display: true,
      text: 'Content Overview',
      color: document.documentElement.classList.contains('dark') ? 'white' : '#333',
      font: {
        size: 18
      }
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        color: document.documentElement.classList.contains('dark') ? 'white' : '#333',
        stepSize: 1
      },
      grid: {
        color: document.documentElement.classList.contains('dark') ? '#4B5563' : '#E5E7EB',
      }
    },
    x: {
      ticks: {
        color: document.documentElement.classList.contains('dark') ? 'white' : '#333',
      },
      grid: {
        color: document.documentElement.classList.contains('dark') ? '#4B5563' : '#E5E7EB',
      }
    }
  }
};

onMounted(async () => {
  try {
    const response = await api.get('/admin/stats');
    stats.value = response.data;
  } catch (err) {
    error.value = 'Failed to load dashboard data.';
    console.error(err);
  } finally {
    loading.value = false;
  }
});
</script>