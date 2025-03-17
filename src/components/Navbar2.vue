<script setup>
import { RouterLink, useRoute } from 'vue-router';
import logo from '@/assets/img/sifa.png';
import { ref } from 'vue';
import profileIcon from '@/assets/img/profile.jpg';

const isActiveLink = (routePath) => {
  const route = useRoute();
  return route.path === routePath;
};

const isDropdownOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};
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
                    ? 'bg-green-900'
                    : 'hover:bg-gray-900 hover:text-white',
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
          <div class="relative">
            <button @click="toggleDropdown" class="flex items-center space-x-2">
              <img 
                :src="profileIcon" 
                alt="Profile" 
                class="w-8 h-8 rounded-full cursor-pointer"
              />
              <!-- Add chevron down icon -->
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
            <div v-if="isDropdownOpen" 
                 class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div class="py-1">
                <RouterLink 
                  to="/profile-settings"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Mpangilio wa Akaunti
                </RouterLink>
                <RouterLink 
                  to="/"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
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
}
</style>
