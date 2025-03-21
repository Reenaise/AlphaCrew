<template>
  <section class="security-section">
    <h2 class="section-title">Security Settings</h2>
    <div class="security-row">
      <label for="current-password" class="security-label">Current Password</label>
      <input type="password" v-model="passwords.currentPassword" id="current-password" class="security-input" />
    </div>
    <div class="security-row">
      <label for="new-password" class="security-label">New Password</label>
      <input type="password" v-model="passwords.newPassword" id="new-password" class="security-input" />
    </div>
    <button @click="updatePassword" class="update-btn">Update Password</button>
  </section>
</template>

<script>
export default {
  name: "SecuritySettings",
  data() {
    return {
      passwords: {
        currentPassword: "",
        newPassword: "",
      },
    };
  },
  methods: {
    async updatePassword() {
      try {
        const response = await this.$http.put(`/update-password/${this.$route.params.userId}`, {
          currentPassword: this.passwords.currentPassword,
          newPassword: this.passwords.newPassword,
        }); // Send updated password to server
        alert(response.data.message); // Show response message
      } catch (error) {
        console.error("Error updating password:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Styling for Security Settings Section */
.security-section {
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

.security-row {
  margin-bottom: 16px;
}

.security-label {
  color: rgba(248, 249, 250, 0.5);
  font-size: 16px;
}

.security-input {
  color: #f8f9fa;
  font-size: 16px;
  padding: 8px;
  background-color: #444;
  border: 1px solid #555;
  width: 100%;
  border-radius: 4px;
}

.update-btn {
  background-color: #007bff;
  color: #fff;
  padding: 12px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.update-btn:hover {
  background-color: #0056b3;
}
</style>





<!-- <template>
  <section class="security-section">
    <h2 class="section-title">Security Settings</h2>
    <div class="security-row">
      <div class="security-info">
        <h3 class="security-label">Change Password</h3>
        <p class="security-description">
          Update your password regularly to keep your account secure
        </p>
      </div>
      <button type="button" class="update-btn">Update</button>
    </div>
    <div class="security-row">
      <div class="security-info">
        <h3 class="security-label">Two-Factor Authentication</h3>
        <p class="security-description">
          Add an extra layer of security to your account
        </p>
      </div>
      <button type="button" class="enable-btn">Enable</button>
    </div>
  </section>
</template>

<script>
export default {
  name: "SecuritySettings",
};
</script>

<style scoped>
.security-section {
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

.security-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid rgba(248, 249, 250, 0.13);
}

.security-label {
  color: #f8f9fa;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
}

.security-description {
  color: rgba(248, 249, 250, 0.5);
  font-size: 14px;
  margin: 0;
}

.update-btn {
  background-color: #14532d;
  color: #f8f9fa;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
}

.enable-btn {
  background: transparent;
  color: #f8f9fa;
  border: 1px solid rgba(248, 249, 250, 0.13);
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
}

@media (max-width: 640px) {
  .security-row {
    flex-direction: column;
    text-align: center;
  }

  .security-info {
    margin-bottom: 16px;
  }

  .update-btn,
  .enable-btn {
    width: 100%;
  }
}
</style> -->
