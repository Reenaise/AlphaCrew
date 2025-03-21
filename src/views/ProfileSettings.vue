<template>
  <div class="min-h-screen flex flex-col">
    <Navbar2 />
    <main class="flex-grow main-content">
      <ProfileHeader />
      <AccountInformation />
      <AccountStatistics />
      <!-- <SecuritySettings /> -->
    </main>
    <Footer />
  </div>
</template>

<script setup>
import ProfileHeader from "../components/ProfileHeader.vue";
import AccountInformation from "../components/AccountInformation.vue";
import AccountStatistics from "../components/AccountStatistics.vue";
import SecuritySettings from "../components/SecuritySettings.vue";
import Navbar2 from "@/components/Navbar2.vue";
import Footer from '@/components/Footer.vue';
</script>

<style scoped>
.profile-container {
  font-family: "Inter", sans-serif;
  background-color: #1a1a1a;
  min-height: 100vh;
  width: 100%;
}

.header {
  color: #f8f9fa;
  font-size: 24px;
  font-weight: 700;
  line-height: 36px;
  background-color: #14532d;
  padding: 16px;
  height: 68px;
}

.main-content {
  max-width: 1136px;
  margin: 32px auto;
  background-color: #222;
  border-radius: 8px;
  padding: 32px;
}

@media (max-width: 991px) {
  .main-content {
    margin: 16px;
    padding: 16px;
  }
}
</style>