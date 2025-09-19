<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-6">Create New Blog Post</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Editor -->
      <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <form @submit.prevent="createBlog">
          <div class="mb-6">
            <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
            <input type="text" v-model="newBlog.title" id="title" required class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
          </div>
          <div class="mb-6">
            <label for="tags" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tags (comma-separated)</label>
            <input type="text" v-model="newBlog.tags" id="tags" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
          </div>
          <div class="mb-6">
            <label for="content" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Content</label>
            <div class="mt-1 quill-container">
              <div ref="editor"></div>
            </div>
          </div>
          <button type="submit" class="inline-flex justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
            Create Blog
          </button>
        </form>
      </div>

      <!-- Live Preview -->
      <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">Live Preview</h2>
        <div class="prose dark:prose-invert max-w-none">
          <h1 v-if="newBlog.title">{{ newBlog.title }}</h1>
          <div v-html="newBlog.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import apiClient from '@/services/api';
import { useRouter } from 'vue-router';

const router = useRouter();
const editor = ref(null);
let quillInstance = null;

const newBlog = ref({
  title: '',
  content: '',
  tags: '',
});

onMounted(() => {
  if (editor.value) {
    quillInstance = new Quill(editor.value, {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ 'header': [1, 2, 3, false] }],
          ['bold', 'italic', 'underline'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ['link', 'image'],
          ['clean']
        ]
      }
    });
    quillInstance.on('text-change', () => {
      newBlog.value.content = quillInstance.root.innerHTML;
    });
  }
});

onBeforeUnmount(() => {
  if (quillInstance) {
    quillInstance = null;
  }
});

const createBlog = async () => {
  try {
    const blogData = {
      ...newBlog.value,
      tags: newBlog.value.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
    };
    await apiClient.post('/admin/blogs', blogData);
    router.push('/admin/manage-blogs');
  } catch (error) {
    console.error('Failed to create blog:', error);
  }
};
</script>

<style>
.ql-editor {
  min-height: 200px;
}
.dark .ql-toolbar {
  border-color: #4a5568;
}
.dark .ql-container {
  border-color: #4a5568;
}
.dark .ql-editor {
  color: #e2e8f0;
}
.dark .ql-snow .ql-stroke {
  stroke: #a0aec0;
}
.dark .ql-snow .ql-picker-label {
  color: #a0aec0;
}
.dark .ql-snow .ql-active .ql-stroke {
  stroke: #3182ce;
}
.dark .ql-snow .ql-active .ql-fill {
  fill: #3182ce;
}
</style>