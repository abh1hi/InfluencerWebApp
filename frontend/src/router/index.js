// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const routes = [
  { path: '/', name: 'Home', component: () => import('../views/HomeView.vue') },
  { path: '/influencers', name: 'Influencers', component: () => import('../views/InfluencersView.vue') },
  { path: '/influencers/:id', name: 'InfluencerDetail', component: () => import('../views/InfluencerDetail.vue') },
  { path: '/blogs', name: 'Blogs', component: () => import('../views/BlogsView.vue') },
  { path: '/blogs/:id', name: 'BlogDetail', component: () => import('../views/BlogDetail.vue') },
  { path: '/login', name: 'Login', component: () => import('../views/LoginView.vue') },
  { path: '/signup', name: 'Signup', component: () => import('../views/SignupView.vue') },
  { path: '/profile', name: 'Profile', component: () => import('../views/ProfileView.vue') },
  // Add the new admin route
  {
    path: '/admin',
    component: () => import('../views/AdminView.vue'),
    meta: { requiresAdmin: true },
    children: [
      { path: '', name: 'AdminDashboard', component: () => import('../views/admin/AdminDashboard.vue') },
      { path: 'create-influencer', name: 'CreateInfluencer', component: () => import('../views/admin/CreateInfluencer.vue') },
      { path: 'manage-influencers', name: 'ManageInfluencers', component: () => import('../views/admin/ManageInfluencers.vue') },
      { path: 'create-blog', name: 'CreateBlog', component: () => import('../views/admin/CreateBlog.vue') },
      { path: 'manage-blogs', name: 'ManageBlogs', component: () => import('../views/admin/ManageBlogs.vue') },
      { path: 'edit-blog/:id', name: 'EditBlog', component: () => import('../views/admin/EditBlog.vue') },
      { path: 'bulk-upload', name: 'BulkUpload', component: () => import('../views/admin/BulkUpload.vue') },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// Navigation guard to protect admin route
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    // Check if the route requires admin access
    if (to.meta.requiresAdmin) {
        // If not authenticated or not an admin, redirect to home
        if (!authStore.isAuthenticated || authStore.userRole !== 'admin') {
            next('/');
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;