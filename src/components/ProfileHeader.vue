<template>
  <section class="profile-header">
    <div class="profile-image" role="img" aria-label="Profile picture"></div>
    <div class="profile-info">
      <h1 class="profile-name">{{ accountInfo.name || 'Loading...' }}</h1>
      <p class="profile-email">{{ accountInfo.email || 'Loading...' }}</p>
    </div>
    <button class="edit-profile" type="button">Edit Profile</button>
  </section>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  setup() {
    const accountInfo = ref({ name: "", email: "" });

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
        console.log("Fetched data:", data); // Debugging: Check if correct data is received
        accountInfo.value = {
          name: data.name, // Ensure correct property name
          email: data.email,
        };
      } catch (error) {
        console.error("Error fetching account information:", error);
      }
    });

    return { accountInfo };
  },
};
</script>

<style scoped>
.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 32px;
}

.profile-image {
  width: 100px;
  height: 100px;
  background-image: url("@/assets/img/profile.jpg");
  background-size: cover;
  background-position: center;
  background-color: #d9d9d9;
  border-radius: 50%;
}

.profile-info {
  margin-left: 30px;
  flex-grow: 1;
}

.profile-name {
  color: #f8f9fa;
  font-size: 22px;
  font-weight: 700;
  line-height: 48px;
}

.profile-email {
  color: rgba(248, 249, 250, 0.5);
  font-size: 12px;
  line-height: 24px;
}

.edit-profile {
  background-color: #14532d;
  color: #f8f9fa;
  border: none;
  margin-left: 20px;
  border-radius: 4px;
  padding: 6px 14px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}

@media (max-width: 640px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
  }

  .profile-info {
    margin: 16px 0;
  }

  .profile-name {
    font-size: 24px;
    line-height: 36px;
  }

  .edit-profile {
    width: 100%;
  }
}
</style>
