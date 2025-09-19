<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import apiClient from '@/services/api';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import BlogCard from '@/components/BlogCard.vue';

const route = useRoute();
const blog = ref(null);
const relatedBlogs = ref([]);
const loading = ref(true);

const fetchBlogData = async (id) => {
  loading.value = true;
  try {
    const [blogResponse, allBlogsResponse] = await Promise.all([
      apiClient.get(`/blogs/${id}`),
      apiClient.get('/blogs')
    ]);
    
    blog.value = blogResponse.data;

    if (blog.value && blog.value.tags && blog.value.tags.length > 0) {
      relatedBlogs.value = allBlogsResponse.data.filter(otherBlog => {
        return otherBlog._id !== blog.value._id &&
               otherBlog.tags.some(tag => blog.value.tags.includes(tag));
      }).slice(0, 3); // Get top 3 related blogs
    } else {
      relatedBlogs.value = [];
    }

  } catch (error) {
    console.error('Error fetching blog post:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchBlogData(route.params.id);
});

watch(() => route.params.id, (newId) => {
  if (newId) {
    fetchBlogData(newId);
  }
});
</script>

<template>
  <div class="bg-white dark:bg-gray-900 min-h-screen">
    <Navbar />
    <main class="container mx-auto px-4 py-12">
      <div v-if="loading" class="text-center text-gray-500 dark:text-gray-400 py-16">Loading...</div>
      <div v-else-if="blog" class="max-w-3xl mx-auto">
        <!-- Blog Header -->
        <div class="text-center mb-8">
          <div class="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
            <span v-if="blog.tags && blog.tags.length > 0" class="font-medium text-primary-700 dark:text-primary-400">{{ blog.tags.join(', ') }}</span>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">{{ blog.title }}</h1>
          <p class="text-gray-600 dark:text-gray-300 mt-4">
            Posted on {{ new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
          </p>
        </div>

        <!-- Blog Content -->
        <div class="prose prose-lg dark:prose-invert max-w-none mx-auto" v-html="blog.content"></div>

        <!-- Related Blogs -->
        <div v-if="relatedBlogs.length > 0" class="mt-16 pt-8 border-t dark:border-gray-700">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Related Posts</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <BlogCard v-for="relatedBlog in relatedBlogs" :key="relatedBlog._id" :blog="relatedBlog" />
          </div>
        </div>
      </div>
      <div v-else class="text-center text-gray-500 dark:text-gray-400 py-16">Blog post not found.</div>
    </main>
    <Footer />
  </div>
</template>