<script setup>
import Hero from '@/components/Hero.vue';
import HomeCards from '@/components/HomeCards.vue';
import JobListings from '@/components/JobListings.vue';
import Navbar2 from '@/components/Navbar2.vue';
import Footer from '@/components/Footer.vue';
import { onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import authHelper, { setRouter } from '@/auth/authHelper';

const router = useRouter();
setRouter(router); // Initialize router in authHelper

let tokenCheckInterval;

const checkTokenValidity = () => {
  if (!authHelper.isAuthenticated()) {
    authHelper.logout();
  }
};

onMounted(() => {
  checkTokenValidity();
  tokenCheckInterval = setInterval(checkTokenValidity, 5 * 1000); // Check every
});

onUnmounted(() => {
  clearInterval(tokenCheckInterval);
});
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