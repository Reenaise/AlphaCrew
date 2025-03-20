<script setup>
import Hero from '@/components/Hero.vue';
import HomeCards from '@/components/HomeCards.vue';
import JobListings from '@/components/JobListings.vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-grow">
      <Hero />
      <HomeCards />
    </main>
    <!-- <Footer /> -->
  </div>
  <!-- <JobListings :limit="3" :showButton="false" /> -->
</template>
