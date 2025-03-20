<script setup>
import { RouterLink, useRoute } from 'vue-router';
import logo from '@/assets/img/sifa.png';
import { ref } from 'vue';
import { onMounted, onUnmounted } from 'vue';
import profileIcon from '@/assets/img/profile.jpg';


// Fafanua isDropdownOpen kwa kutumia ref
const isDropdownOpen = ref(false);

// Fafanua toggleDropdown function
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const isActiveLink = (routePath) => {
  const route = useRoute();
  return route.path === routePath;
};

const closeDropdown = (event) => {
  // Tumia refs kwa dropdown na profile button
  const dropdown = document.querySelector('.dropdown-menu'); // Dropdown menu element
  const profileButton = document.querySelector('.profile-button'); // Profile button element

  // Hakikisha kuwa dropdown na profileButton zipo kabla ya kuzitumia
  if (dropdown && profileButton) {
    // Funga dropdown ikiwa click imefanywa nje ya dropdown na profile button
    if (!dropdown.contains(event.target) && !profileButton.contains(event.target)) {
      isDropdownOpen.value = false;
    }
  }
};



// Ongeza event listener wakati component ime-mount
onMounted(() => {
  document.addEventListener('click', closeDropdown);
});

// Ondoa event listener kabla ya component kuharibiwa
onUnmounted(() => {
  document.removeEventListener('click', closeDropdown);
});

</script>

<template>
  <nav class="bg-customGreen border-b border-green-500">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="flex h-20 items-center justify-between">
        <div
          class="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
        >
          <!-- Logo -->
          <RouterLink class="flex flex-shrink-0 items-center mr-4" to="/">
            <img
            class="h-10 w-auto rounded"
            :src="logo"
            alt="Vue Jobs"
          />
            <!-- <span class="hidden md:block text-white text-2xl font-bold ml-2"
              >Vue Jobs</span -->
            
          </RouterLink>
          <div class="flex flex-1 items-center justify-center justify-start">
            <div class="flex space-x-2">
              <RouterLink
                to="/home2"
                :class="[
                  isActiveLink('/home2')
                    ? 'bg-[#14532D]'
                    : 'hover:bg-[#14532D] hover:text-white',
                  'text-green',
                  'px-3',
                  'py-2',
                  'rounded-md',
                  'text-decoration-none'
                ]"
                >Nyumbani</RouterLink
              >
              <!-- <RouterLink
                to="/jobs"
                :class="[
                  isActiveLink('/jobs')
                    ? 'bg-green-900'
                    : 'hover:bg-gray-900 hover:text-white',
                  'text-white',
                  'px-3',
                  'py-2',
                  'rounded-md',
                ]"
                >Services</RouterLink
              > -->
              <!-- <RouterLink
                to="/jobs/add"
                :class="[
                  isActiveLink('/jobs/add')
                    ? 'bg-green-900'
                    : 'hover:bg-gray-900 hover:text-white',
                  'text-white',
                  'px-3',
                  'py-2',
                  'rounded-md',
                ]"
                >Resources</RouterLink
              > -->
              <!-- <RouterLink
                to="/payments"
                :class="[
                  isActiveLink('/payments')
                    ? 'bg-green-900'
                    : 'hover:bg-gray-900 hover:text-white',
                  'text-white',
                  'px-3',
                  'py-2',
                  'rounded-md',
                ]"
                >payments</RouterLink
              > -->
              <RouterLink
                to="/expenses"
                :class="[
                  isActiveLink('/expenses')
                    ? 'bg-green-900'
                    : 'hover:bg-gray-900 hover:text-white',
                  'text-green',
                  'px-3',
                  'py-2',
                  'rounded-md',
                  'text-decoration-none'
                ]"
                >Matumizi</RouterLink
              >
              <RouterLink
                to="/income"
                :class="[
                  isActiveLink('/income')
                    ? 'bg-green-900'
                    : 'hover:bg-gray-900 hover:text-white',
                  'text-green',
                  'px-3',
                  'py-2',
                  'rounded-md',
                  'text-decoration-none'
                ]"
                >Mapato</RouterLink
              >
              <!-- <RouterLink
                to="/summary"
                :class="[
                  isActiveLink('/summary')
                    ? 'bg-green-900'
                    : 'hover:bg-gray-900 hover:text-white',
                  'text-white',
                  'px-3',
                  'py-2',
                  'rounded-md',
                  'text-decoration-none'
                ]"
                >Summary</RouterLink
              > -->

              <RouterLink
                to="/ExpenseSummary"
                :class="[
                  isActiveLink('/ExpenseSummary')
                    ? 'bg-green-900'
                    : 'hover:bg-gray-900 hover:text-white',
                  'text-green',
                  'px-3',
                  'py-2',
                  'rounded-md',
                  'text-decoration-none'
                ]"
                >RipotiYaMatumizi</RouterLink
              >

              <RouterLink
                to="/IncomeSummary"
                :class="[
                  isActiveLink('/IncomeSummary')
                    ? 'bg-green-900'
                    : 'hover:bg-gray-900 hover:text-white',
                  'text-green',
                  'px-3',
                  'py-2',
                  'rounded-md',
                  'text-decoration-none'
                ]"
                >RipotiYaMapato</RouterLink
              >
            </div>
          </div>
          
          <!-- Replace logout link with profile dropdown -->
          <!-- Profile Dropdown -->
          <div class="relative">
            <button 
              @click="toggleDropdown" 
              class="flex items-center space-x-2 profile-button" 
            >
              <img 
                :src="profileIcon" 
                alt="Profile" 
                class="w-8 h-8 rounded-full cursor-pointer"
              />
              <svg
                class="w-4 h-4 text-green-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            
            <!-- Dropdown Menu -->
            <div 
  v-if="isDropdownOpen" 
  class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[#1A1A1A] text-white ring-opacity-0 focus:ring-0 outline-none dropdown-menu"
>
  <div class="py-1">
    <RouterLink 
      to="/profile-settings"
      class="block px-4 py-2 text-sm text-white hover:bg-gray-700 no-underline hover:no-underline"
    @mouseleave="closeDropdownOnMouseLeave"
      >
      <i class="fas fa-cog mr-2"></i> 
      Mpangilio
    </RouterLink>
    <RouterLink 
      to="/"
      class="block px-4 py-2 text-sm text-white hover:bg-gray-700 no-underline hover:no-underline"
    >
      <i class="fas fa-sign-out-alt mr-2"></i>
      Jiondoe
    </RouterLink>
  </div>
</div>

              </div>
            </div>
          </div>
          
        </div>
    
  </nav>
</template>

<style scoped>
.relative {
  position: relative;
}

.absolute {
  position: absolute;
  z-index: 1000; /* Hakikisha dropdown iko juu ya maudhui mengine */
}

.dropdown-menu {
  display: block; /* Hakikisha dropdown inaonekana */
  width: 8rem; /* Punguza width kwa 8rem (128px) */
}

.dropdown-menu a {
  display: flex; /* Tumia flexbox kwa icons na maandishi */
  align-items: center; /* Align icons na maandishi kwa katikati */
}
</style>







