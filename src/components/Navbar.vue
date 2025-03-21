<script setup>
import { RouterLink, useRoute } from 'vue-router';
import logo from '@/assets/img/cash.png';

const isActiveLink = (routePath) => {
  const route = useRoute();
  return route.path === routePath;
};
</script>

<template>
  <div >
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
                to="/"
                :class="[
                  isActiveLink('/')
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
                to="/home2"
                :class="[
                  isActiveLink('/home2')
                    ? 'bg-green-900'
                    : 'hover:bg-gray-900 hover:text-white',
                  'text-white',
                  'px-3',
                  'py-2',
                  'rounded-md',
                  'text-decoration-none'
                ]"
                >Home</RouterLink
              > -->
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
              <!-- <RouterLink
                to="/completePayments"
                :class="[
                  isActiveLink('/completePayments')
                    ? 'bg-green-900'
                    : 'hover:bg-gray-900 hover:text-white',
                  'text-white',
                  'px-3',
                  'py-2',
                  'rounded-md',
                  'text-decoration-none'
                ]"
                >completePayments</RouterLink
              >
              <RouterLink
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
              >

              <RouterLink
                to="/Reports"
                :class="[
                  isActiveLink('/Reports')
                    ? 'bg-green-900'
                    : 'hover:bg-gray-900 hover:text-white',
                  'text-white',
                  'px-3',
                  'py-2',
                  'rounded-md',
                  'text-decoration-none'
                ]"
                >reports</RouterLink
              >
            </div> -->
            </div>
          </div>
          <div class>
            <div class="flex space-x-2">
              <RouterLink
                to="/login"
                :class="[
                  isActiveLink('/login')
                    ? 'bg-green-900'
                    : 'hover:bg-gray-900 hover:text-white',
                  'text-green',
                  'bg-yellow',
                  'px-3',
                  'py-2',
                  'rounded-md',
                  'text-decoration-none'
                ]"
                >Ingia</RouterLink
              >
              <RouterLink
                to="/register"
                :class="[
                  isActiveLink('/register')
                    ? 'bg-green-900'
                    : 'hover:bg-gray-900 hover:text-white',
                  'text-green',
                  'bg-yellow',
                  'px-3',
                  'py-2',
                  'rounded-md',
                  'text-decoration-none'
                ]"
                >Sajili</RouterLink
              >
              </div>
            </div>

        </div>
      </div>
    </div>
  </nav>
  </div>
</template>


<style>
/* .bg-yellow{
  background-color: yellow;
} */
.navbar{
  background-color: green;
}
</style>
