<script setup>
import { ref, onMounted, computed } from 'vue';
import apiClient from '@/services/api';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import BlogCard from '@/components/BlogCard.vue';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';

const blogs = ref([]);
const loading = ref(true);
const searchTerm = ref('');
const selectedTag = ref('');

const allTags = computed(() => {
  const tags = new Set();
  blogs.value.forEach(blog => {
    if (blog.tags) {
      blog.tags.forEach(tag => tags.add(tag));
    }
  });
  return Array.from(tags);
});

const filteredBlogs = computed(() => {
  let filtered = blogs.value;

  if (searchTerm.value) {
    filtered = filtered.filter(blog =>
      blog.title.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  }

  if (selectedTag.value) {
    filtered = filtered.filter(blog => blog.tags && blog.tags.includes(selectedTag.value));
  }

  return filtered;
});

const selectTag = (tag) => {
  if (selectedTag.value === tag) {
    selectedTag.value = '';
  } else {
    selectedTag.value = tag;
  }
};

onMounted(async () => {
    try {
        const response = await apiClient.get('/blogs');
        blogs.value = response.data;
    } catch (error) {
        console.error('Error fetching blogs:', error);
    } finally {
        loading.value = false;
    }
});
</script>

<template>
  <div class="bg-white dark:bg-gray-900 min-h-screen">
    <Navbar />
    <main class="container mx-auto px-4 py-8">
      <!-- Hero Section -->
      <section class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div class="md:col-span-2 bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-sm">
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-3">Simple design. Deep ideas.</h1>
          <p class="text-gray-600 dark:text-gray-300 text-lg">
            Welcome to a clean, modern blog built with minimalism in mind. Explore thoughts on design, technology, and creativity.
          </p>
        </div>
        <aside class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Search & Filter</h3>
          <div class="relative mb-4">
            <input
              v-model="searchTerm"
              type="text"
              placeholder="Search posts..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-primary-500 focus:border-primary-500"
            />
            <MagnifyingGlassIcon class="h-5 w-5 text-gray-400 absolute top-1/2 left-3 transform -translate-y-1/2" />
          </div>
          <h4 class="font-semibold mb-2 text-gray-700 dark:text-gray-300">Popular Tags</h4>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="tag in allTags"
              :key="tag"
              @click="selectTag(tag)"
              :class="[
                'px-3 py-1 text-sm font-medium rounded-full transition-colors',
                selectedTag === tag ? 'bg-primary-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              ]"
            >
              {{ tag }}
            </button>
          </div>
        </aside>
      </section>

      <!-- Blog Grid -->
      <div>
        <h2 class="text-3xl font-bold text-gray-900 mb-6">Latest Posts</h2>
        <div v-if="loading" class="text-center text-gray-500">Loading...</div>
        <div v-else-if="filteredBlogs.length === 0" class="text-center text-gray-500">
          No posts found.
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <BlogCard v-for="blog in filteredBlogs" :key="blog._id" :blog="blog" />
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>