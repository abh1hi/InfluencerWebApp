// src/stores/authStore.js

import { defineStore } from 'pinia';
import apiClient from '@/services/api';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || null,
        isAuthenticated: !!localStorage.getItem('token'),
        // Add a role to the state
        userRole: null
    }),
    actions: {
        setAuthHeader() {
            if (this.token) {
                apiClient.defaults.headers.common['x-auth-token'] = this.token;
            }
        },
        async login(email, password) {
            try {
                const response = await apiClient.post('/auth/login', { email, password });
                this.token = response.data.token;
                this.isAuthenticated = true;
                localStorage.setItem('token', this.token);
                this.setAuthHeader();
                // Fetch the user's profile to get their role
                await this.fetchUser();
                return true;
            } catch (error) {
                console.error('Login failed:', error.response?.data?.msg || error.message);
                return false;
            }
        },
        async signup(username, email, password) {
            try {
                const response = await apiClient.post('/auth/signup', { username, email, password });
                this.token = response.data.token;
                this.isAuthenticated = true;
                localStorage.setItem('token', this.token);
                this.setAuthHeader();
                // Fetch the user's profile to get their role
                await this.fetchUser();
                return true;
            } catch (error) {
                console.error('Signup failed:', error.response?.data?.msg || error.message);
                return false;
            }
        },
        async fetchUser() {
            try {
                if (this.isAuthenticated) {
                    this.setAuthHeader();
                    const response = await apiClient.get('/users/profile');
                    this.userRole = response.data.role;
                }
            } catch (error) {
                console.error('Failed to fetch user profile:', error);
                // Log the user out if fetching the profile fails (e.g., token expired)
                this.logout();
            }
        },
        logout() {
            this.token = null;
            this.isAuthenticated = false;
            this.userRole = null;
            localStorage.removeItem('token');
            delete apiClient.defaults.headers.common['x-auth-token'];
        }
    }
});