<template>
  <section class="stats-section">
    <h2 class="section-title">Account Statistics</h2>
    <div class="stats-grid">
      <article class="stat-card">
        <h3 class="stat-label">Total Transactions</h3>
        <p class="stat-value">145</p>
      </article>
      <article class="stat-card">
        <h3 class="stat-label">Jumla ya matumizi</h3>
        <p class="stat-value">1,234,567 TZS</p>
      </article>
      <article class="stat-card">
        <h3 class="stat-label">Total Earned</h3>
        <p class="stat-value">2,345,678 TZS</p>
      </article>
    </div>
  </section>
</template>

<script>
export default {
  name: "AccountStatistics",
};
</script>

<style scoped>
.stats-section {
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

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.stat-card {
  background-color: #444;
  border-radius: 4px;
  padding: 16px;
  text-align: center;
}

.stat-label {
  color: rgba(248, 249, 250, 0.5);
  font-size: 16px;
  margin-bottom: 8px;
  font-weight: normal;
}

.stat-value {
  color: #f8f9fa;
  font-size: 24px;
  font-weight: 700;
  margin: 0;
}

@media (max-width: 991px) {
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>
