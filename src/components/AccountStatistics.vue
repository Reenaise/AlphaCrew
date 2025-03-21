<template>
  <section class="statistics-section">
    <h2 class="section-title">Account Statistics</h2>
    <div class="statistics-row">
      <dt class="statistics-label">Total Income</dt>
      <dd class="statistics-value">{{ statistics.totalIncome }}</dd>
    </div>
    <div class="statistics-row">
      <dt class="statistics-label">Total Expenses</dt>
      <dd class="statistics-value">{{ statistics.totalExpenses }}</dd>
    </div>
    <div class="statistics-row">
      <dt class="statistics-label">Net Balance</dt>
      <dd class="statistics-value">{{ statistics.netBalance }}</dd>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    const statistics = ref({
      totalIncome: 0,
      totalExpenses: 0,
      netBalance: 0,
    });

    const route = useRoute();

    const fetchStatistics = async () => {
      try {
        const response = await fetch(`http://localhost:5001/servers/userStatistics`);
        if (!response.ok) {
          throw new Error("Failed to fetch statistics");
        }
        const data = await response.json();
        statistics.value = data;
      } catch (error) {
        console.error("Error fetching account statistics:", error);
      }
    };

    onMounted(fetchStatistics);

    return { statistics };
  },
};
</script>

<style scoped>
/* Styling for Account Statistics Section */
.statistics-section {
  background-color: #333;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 32px;
}

.section-title {
  color: #f8f9fa;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 24px;
}

.statistics-row {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid rgba(248, 249, 250, 0.13);
}

.statistics-label {
  color: rgba(248, 249, 250, 0.5);
  font-size: 16px;
}

.statistics-value {
  color: #f8f9fa;
  font-size: 16px;
  margin: 0;
}
</style>
