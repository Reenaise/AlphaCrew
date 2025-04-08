<script>
import { ref, onMounted } from "vue";

export default {
  setup() {
    const accountInfo = ref({ name: "", email: "" });

    // In your Vue component
    onMounted(async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage
        const response = await fetch("http://localhost:5001/servers/userInfo", {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in the Authorization header
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Fetched data:", data);

        accountInfo.value = {
          incomeRange: data.incomeRange,
        };
      } catch (error) {
        console.error("Error fetching account information:", error);
      }
    });

    return { accountInfo };
  },
};
</script>

<template>
  <section class="info-section">
    <h2 class="section-title">Account Information</h2>
    <!-- <div class="info-row">
      <dt class="info-label">Date of birth</dt>
      <dd class="info-value">{{ accountInfo.dob || 'Loading...' }}</dd>
    </div> -->
    <div class="info-row">
      <dt class="info-label">Income Range</dt>
      <dd class="info-value">{{ accountInfo.incomeRange || "Loading..." }}</dd>
    </div>
  </section>
</template>

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
