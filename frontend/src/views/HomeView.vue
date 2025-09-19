<script setup>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <div class="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
    <!-- Navbar -->
    <Navbar />

    <!-- Hero Section -->
    <section class="relative bg-white overflow-hidden">
      <!-- Background Gradient -->
      <div class="absolute inset-0 bg-gradient-to-b from-white to-blue-50 -z-10"></div>

      <!-- Content -->
      <div
        class="container mx-auto px-4 lg:px-8 py-16 lg:py-20 flex flex-col lg:flex-row items-center gap-12"
      >
        <!-- Hero Text -->
        <div class="lg:w-1/2 space-y-6 text-center lg:text-left">
          <h1 class="text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            Connect with <span class="text-blue-600">Top Influencers</span>
          </h1>
          <p class="text-lg text-gray-600 max-w-lg mx-auto lg:mx-0">
            Discover, collaborate, and grow your brand with our curated network of creators.
            From niche experts to viral sensations — find the perfect match.
          </p>
          <div class="flex justify-center lg:justify-start gap-4 pt-2">
            <router-link
              to="/influencers"
              class="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-500 transition"
            >
              Get Started
            </router-link>
            <router-link
              to="/blogs"
              class="px-6 py-3 bg-white border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Live Demo →
            </router-link>
          </div>
        </div>

        <!-- Hero Image -->
        <div class="lg:w-1/2 relative flex justify-center">
          <!-- Decorative Shape -->
          <div
            class="absolute -top-10 right-0 w-72 h-72 bg-blue-200 rounded-full opacity-40 filter blur-3xl"
          ></div>
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80"
            alt="Influencer marketing hero"
            class="relative rounded-2xl shadow-xl w-full max-w-lg"
          />
        </div>
      </div>
    </section>

    <!-- Who We Serve Section -->
    <section class="container mx-auto px-4 lg:px-8 py-12 lg:py-20">
      <div class="max-w-3xl mx-auto text-center space-y-4">
        <h2 class="text-3xl font-bold">Who We Serve</h2>
        <p class="text-gray-600">
          Freelancers, small brands, and large enterprises — we have something for every creator.
        </p>
      </div>

      <!-- Cards -->
      <div class="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Card 1 -->
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col lg:flex-row">
          <img
            src="https://images.unsplash.com/photo-1522206024047-9c925421675b?auto=format&fit=crop&w=600&q=80"
            class="w-full lg:w-1/2 object-cover"
            alt="Freelancer"
          />
          <div class="p-6 flex flex-col justify-center">
            <h3 class="text-2xl font-semibold mb-2">Freelancers</h3>
            <p class="text-gray-600">
              Grow your audience, showcase your work, and get discovered by top brands.
            </p>
          </div>
        </div>

        <!-- Card 2 -->
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col lg:flex-row">
          <div class="p-6 flex flex-col justify-center">
            <h3 class="text-2xl font-semibold mb-2">Brands</h3>
            <p class="text-gray-600">
              Launch campaigns, collaborate with authentic voices, and amplify your reach.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=600&q=80"
            class="w-full lg:w-1/2 object-cover"
            alt="Brands"
          />
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="bg-blue-600 text-white py-16 lg:py-24">
      <div class="container mx-auto px-4 lg:px-8 max-w-3xl text-center space-y-6">
        <h2 class="text-3xl lg:text-4xl font-bold">Features</h2>
        <p class="text-lg">
          Works seamlessly to drive results, simplify processes, and elevate your influence.
        </p>
      </div>

      <!-- Feature List -->
      <div
        class="container mx-auto px-4 lg:px-8 mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <!-- Feature 1 -->
        <div class="flex items-start space-x-4">
          <div
            class="w-12 h-12 flex-shrink-0 bg-white bg-opacity-25 rounded-lg flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h4 class="text-xl font-semibold">Global Access</h4>
            <p class="text-gray-200">Work with influencers from around the world.</p>
          </div>
        </div>

        <!-- Feature 2 -->
        <div class="flex items-start space-x-4">
          <div
            class="w-12 h-12 flex-shrink-0 bg-white bg-opacity-25 rounded-lg flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 7v4a1 1 0 001 1h3m10 0h3a1 1 0 001-1V7m0 6v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5"
              />
            </svg>
          </div>
          <div>
            <h4 class="text-xl font-semibold">Fast Tools</h4>
            <p class="text-gray-200">Get insights, manage collaborations, and track performance.</p>
          </div>
        </div>

        <!-- Feature 3 -->
        <div class="flex items-start space-x-4">
          <div
            class="w-12 h-12 flex-shrink-0 bg-white bg-opacity-25 rounded-lg flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v8m-4-4h8" />
            </svg>
          </div>
          <div>
            <h4 class="text-xl font-semibold">Easy Payout</h4>
            <p class="text-gray-200">Send and receive money quickly and securely.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script>
export default {
  name: 'HomeView',
}
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
