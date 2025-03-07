<script setup>
import { RouterLink, useRoute } from 'vue-router';
import logo from '@/assets/img/sifa.png';

const isActiveLink = (routePath) => {
  const route = useRoute();
  return route.path === routePath;
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
              <RouterLink
                to="/profile-settings"
                :class="[
                  isActiveLink('/profile-settings')
                    ? 'bg-green-900'
                    : 'hover:bg-gray-900 hover:text-white',
                  'text-green',
                  'px-3',
                  'py-2',
                  'rounded-md',
                  'text-decoration-none'
                ]"
                >Wasifu</RouterLink
              >
            </div>
          </div>
          <div class>
            <div class="flex space-x-2">
              <RouterLink
                to="/"
                :class="[
                  isActiveLink('/logout')
                    ? 'bg-green-900'
                    : 'hover:bg-gray-900 hover:text-white',
                  'text-green',
                  'px-3',
                  'py-2',
                  'rounded-md',
                  'text-decoration-none'
                ]"
                >Jiondoe</RouterLink
              >
              <!-- <RouterLink
                to="/register"
                :class="[
                  isActiveLink('/register')
                    ? 'bg-green-900'
                    : 'hover:bg-gray-900 hover:text-white',
                  'text-white',
                  'px-3',
                  'py-2',
                  'rounded-md',
                  'text-decoration-none'
                ]"
                >Sign Up</RouterLink
              > -->
              </div>
            </div>

        </div>
      </div>
    </div>
  </nav>
</template>
