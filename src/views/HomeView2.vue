<script setup>
import Hero from '@/components/Hero.vue';
import HomeCards from '@/components/HomeCards.vue';
import JobListings from '@/components/JobListings.vue';
import Navbar2 from '@/components/Navbar2.vue';
import Footer from '@/components/Footer.vue';

</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Navbar2 />
    <main class="flex-grow">
      <Hero />
      <HomeCards />
    </main>
    <Footer />
  </div>
</template>
