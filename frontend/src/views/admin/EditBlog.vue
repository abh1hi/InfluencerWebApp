<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import apiClient from '@/services/api';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const route = useRoute();
const router = useRouter();
const blog = ref({
  title: '',
  content: '',
  tags: []
});
const tagsInput = ref('');
const editor = ref(null);
let quillInstance = null;

onMounted(async () => {
  const blogId = route.params.id;
  try {
    const response = await apiClient.get(`/blogs/${blogId}`);
    blog.value = response.data;
    tagsInput.value = response.data.tags.join(', ');

    if (editor.value) {
      quillInstance = new Quill(editor.value, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['link', 'image', 'video'],
            ['clean']
          ]
        }
      });
      quillInstance.root.innerHTML = blog.value.content;
      quillInstance.on('text-change', () => {
        blog.value.content = quillInstance.root.innerHTML;
      });
    }
  } catch (error) {
    console.error('Failed to fetch blog:', error);
  }
});

const updateBlog = async () => {
  try {
    const blogData = {
      ...blog.value,
      tags: tagsInput.value.split(',').map(tag => tag.trim()).filter(tag => tag),
    };
    await apiClient.put(`/admin/blogs/${route.params.id}`, blogData);
    router.push({ name: 'ManageBlogs' });
  } catch (error) {
    console.error('Failed to update blog:', error.response?.data?.msg || error.message);
  }
};
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-6">Edit Blog Post</h1>
    <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <form @submit.prevent="updateBlog" class="space-y-6">
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
          <input v-model="blog.title" type="text" id="title" required class="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label for="tags" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tags (comma-separated)</label>
          <input v-model="tagsInput" type="text" id="tags" class="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Content</label>
          <div ref="editor" class="mt-1 bg-white dark:bg-gray-700"></div>
        </div>
        <div class="flex justify-end">
          <button type="button" @click="router.push({ name: 'ManageBlogs' })" class="bg-gray-200 text-gray-700 py-2 px-4 rounded-md mr-3 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500">
            Cancel
          </button>
          <button type="submit" class="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
            Update Blog
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
