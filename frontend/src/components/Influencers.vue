<template>
  <div class="min-h-screen bg-gray-50 text-gray-800">
    <Navbar />

    <div class="flex flex-wrap items-center gap-4 px-6 py-4 bg-white shadow-sm">
      <select class="rounded-lg border border-gray-300 px-3 py-2 text-sm">
        <option>All Categories</option>
        <option>Tech</option>
        <option>Lifestyle</option>
        <option>Fitness</option>
        <option>Travel</option>
      </select>

      <select class="rounded-lg border border-gray-300 px-3 py-2 text-sm">
        <option>Followers</option>
        <option>0–50k</option>
        <option>50k–200k</option>
        <option>200k+</option>
      </select>

      <select class="rounded-lg border border-gray-300 px-3 py-2 text-sm">
        <option>Trending</option>
        <option>Most Followers</option>
        <option>Newest</option>
      </select>
    </div>

    <main class="px-6 py-8">
      <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <InfluencerCard
          v-for="inf in influencers"
          :key="inf.id"
          :name="inf.name"
          :username="inf.username"
          :followers="inf.followers"
          :tags="inf.tags"
          :image="inf.image"
        />
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Navbar from './Navbar.vue'
import Footer from './Footer.vue'
import InfluencerCard from './InfluencerCard.vue'

const influencers = [
  {
    id: 1,
    name: "Aditi Sharma",
    username: "aditi_fit",
    followers: "120k",
    tags: ["Fitness", "Lifestyle"],
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 2,
    name: "Rohan Mehta",
    username: "rohan_tech",
    followers: "200k",
    tags: ["Tech", "Gadgets"],
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "Sara Khan",
    username: "sara_travel",
    followers: "80k",
    tags: ["Travel", "Lifestyle"],
    image: "https://randomuser.me/api/portraits/women/20.jpg",
  },
  {
    id: 4,
    name: "Aman Verma",
    username: "aman_music",
    followers: "50k",
    tags: ["Music", "Entertainment"],
    image: "https://randomuser.me/api/portraits/men/12.jpg",
  },
]
</script>
