<template>
  <section class="info-section">
    <h2 class="section-title">Account Information</h2>
    <div class="info-row">
      <dt class="info-label">Phone Number</dt>
      <dd class="info-value">+255 123 456 789</dd>
    </div>
    <div class="info-row">
      <dt class="info-label">Kipat</dt>
      <dd class="info-value">Business</dd>
    </div>
    <div class="info-row">
      <dt class="info-label">Tarehe ya kuzaliwa</dt>
      <dd class="info-value">2023-01-15</dd>
    </div>
  </section>
</template>

<script>
export default {
  name: "AccountInformation",
};
</script>

<style scoped>
.info-section {
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

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid rgba(248, 249, 250, 0.13);
}

.info-label {
  color: rgba(248, 249, 250, 0.5);
  font-size: 16px;
}

.info-value {
  color: #f8f9fa;
  font-size: 16px;
  margin: 0;
}
</style>
