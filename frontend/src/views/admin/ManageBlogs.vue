<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from '@/services/api';
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/outline';

const blogs = ref([]);
const router = useRouter();

const fetchBlogs = async () => {
  try {
    const response = await apiClient.get('/blogs');
    blogs.value = response.data;
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
  }
};

const deleteBlog = async (id) => {
  if (confirm('Are you sure you want to delete this blog post?')) {
    try {
      await apiClient.delete(`/admin/blogs/${id}`);
      // Refresh the list after deletion
      blogs.value = blogs.value.filter(blog => blog._id !== id);
    } catch (error) {
      console.error('Failed to delete blog:', error.response?.data?.msg || error.message);
    }
  }
};

const editBlog = (id) => {
  router.push({ name: 'EditBlog', params: { id } });
};

onMounted(fetchBlogs);
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-6">Manage Blogs</h1>
    <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
      <div class="px-6 py-4">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Title
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Created At
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-if="blogs.length === 0">
                <td colspan="3" class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-center">
                  No blogs found.
                </td>
              </tr>
              <tr v-for="blog in blogs" :key="blog._id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900 dark:text-white">{{ blog.title }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-500 dark:text-gray-300">{{ new Date(blog.createdAt).toLocaleDateString() }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button @click="editBlog(blog._id)" class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-200 mr-4">
                    <PencilIcon class="h-5 w-5" />
                  </button>
                  <button @click="deleteBlog(blog._id)" class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200">
                    <TrashIcon class="h-5 w-5" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
