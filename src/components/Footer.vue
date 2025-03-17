<script setup>
import { RouterLink, useRoute } from 'vue-router';
import '@fortawesome/fontawesome-free/css/all.css'

const isActiveLink = (routePath) => {
  const route = useRoute();
  return route.path === routePath;
};
</script>

<template>
  <footer class="bg-customGreen py-8 text-green mt-auto">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Company Info -->
        <div>
          <h3 class="text-xl font-bold mb-4 text-green">Cash Flow Tracker</h3>
          <p class="mb-4 text-green">Kuimarisha wajasiriamali kwa ufuatiliaji rahisi wa rekodi za mapato na matumizi.</p>
          <div class="flex space-x-4">
            <a href="#" class="text-green hover:text-green-300">
              <i class="fab fa-linkedin fa-lg"></i>
            </a>
            <a href="#" class="text-green hover:text-green-300">
              <i class="fab fa-twitter fa-lg"></i>
            </a>
            <a href="#" class="text-green hover:text-green-300">
              <i class="fab fa-instagram fa-lg"></i>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-xl font-bold mb-4 text-green">Viungo vya Haraka</h3>
          <ul class="space-y-2">
            <li>
              <RouterLink to="/home2" class="text-green hover:text-green-300">
                <i class="fas fa-home mr-2"></i>Nyumbani
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/expenses" class="text-green hover:text-green-300">
                <i class="fas fa-money-bill-wave mr-2"></i>Matumizi
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/income" class="text-green hover:text-green-300">
                <i class="fas fa-coins mr-2"></i>Mapato
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/ExpenseSummary" class="text-green hover:text-green-300">
                <i class="fas fa-chart-pie mr-2"></i>Ripoti ya Matumizi
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/IncomeSummary" class="text-green hover:text-green-300">
                <i class="fas fa-chart-line mr-2"></i>Ripoti ya Mapato
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h3 class="text-xl font-bold mb-4 text-green">Mawasiliano</h3>
          <ul class="space-y-2 text-green">
            <li><i class="fas fa-envelope mr-2"></i> info@cashflowtracker.co.tz</li>
            <li><i class="fas fa-phone mr-2"></i> +255 684 353 684</li>
            <li><i class="fas fa-map-marker-alt mr-2"></i> Dar es Salaam, Tanzania</li>
          </ul>
        </div>
      </div>
      <div class="border-t border-green-600 mt-8 pt-8 text-center">
        <p class="text-green">&copy; 2024 Cash Flow Tracker. Haki zote zimehifadhiwa.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.text-green {
  color: #36B34A;
}

footer {
  margin-top: auto;
  border-top: 1px solid rgba(54, 179, 74, 0.2);
}
</style>

////