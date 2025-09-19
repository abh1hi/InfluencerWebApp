<script setup>
import { computed } from 'vue';

const props = defineProps({
  blog: {
    type: Object,
    required: true,
  },
});

const coverImage = computed(() => {
  if (typeof window === 'undefined' || !props.blog.content) return null;
  const div = document.createElement('div');
  div.innerHTML = props.blog.content;
  const img = div.querySelector('img');
  return img ? img.src : null;
});

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Basic function to extract text from HTML
const getExcerpt = (html) => {
  if (typeof window === 'undefined') return '';
  const div = document.createElement('div');
  div.innerHTML = html;
  // Remove script and style elements to avoid showing code in excerpt
  div.querySelectorAll('script, style').forEach(el => el.remove());
  let text = div.textContent || div.innerText || '';
  return text.replace(/\s\s+/g, ' ').trim();
};
</script>

<template>
  <router-link :to="`/blogs/${blog._id}`" class="group block bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-primary-500/10 transition-shadow duration-300 overflow-hidden">
    <div class="flex flex-col h-full">
      <img v-if="coverImage" :src="coverImage" :alt="blog.title" class="w-full h-40 object-cover" />
      
      <div class="p-4 flex flex-col flex-grow">
        <div class="mb-3">
          <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
            <span v-if="blog.tags && blog.tags.length > 0" class="font-medium text-primary-700 dark:text-primary-400">{{ blog.tags[0] }}</span>
            <span v-if="blog.tags && blog.tags.length > 0">•</span>
            <span>{{ Math.ceil(getExcerpt(blog.content).length / 500) }} min read</span>
          </div>
          <h3 class="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 line-clamp-2">{{ blog.title }}</h3>
        </div>
        <p class="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4 flex-grow">
          {{ getExcerpt(blog.content) }}
        </p>
        <div class="mt-auto flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>{{ formatDate(blog.date) }}</span>
          <span class="font-semibold text-primary-600 dark:text-primary-400 group-hover:underline">Read More &rarr;</span>
        </div>
      </div>
    </div>
  </router-link>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>