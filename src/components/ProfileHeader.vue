<template>
  <section class="profile-header">
    <div 
      class="profile-image" 
      :style="{ 
        backgroundImage: `url(${profileImageUrl})`,
        backgroundColor: !profileImageUrl ? '#d9d9d9' : 'transparent'
      }"
      @error="handleImageError"
    ></div>
    <input 
      type="file" 
      id="profilePictureInput" 
      accept="image/*" 
      @change="handleFileUpload"
      style="display: none;"
    />
    <div class="profile-info">
      <h1 class="profile-name">{{ accountInfo.name || 'Loading...' }}</h1>
      <p class="profile-email">{{ accountInfo.email || 'Loading...' }}</p>
    </div>
    <button class="edit-profile" @click="triggerFileInput">Change Photo</button>
  </section>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  setup() {
    const accountInfo = ref({ name: "", email: "" });
    const profileImageUrl = ref("");

    // Handle image loading errors
    const handleImageError = () => {
      profileImageUrl.value = "/default-profile.jpg";
    };

    // Fetch user info and profile picture
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        
        // Fetch account info
        const infoResponse = await fetch("http://localhost:5001/servers/userInfo", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const infoData = await infoResponse.json();
        accountInfo.value = {
          name: infoData.name,
          email: infoData.email
        };

        // Fetch profile picture
        const pictureResponse = await fetch("http://localhost:5001/servers/profile-picture", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const pictureData = await pictureResponse.json();
        
        profileImageUrl.value = pictureData.imageUrl 
          ? `http://localhost:5001${pictureData.imageUrl}`
          : "/default-profile.jpg";
          
      } catch (error) {
        console.error("Error fetching user data:", error);
        profileImageUrl.value = "/default-profile.jpg";
      }
    };

    // Handle file upload
    const handleFileUpload = async (event) => {
      const file = event.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("profilePicture", file);

      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5001/servers/upload-profile-picture", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });

        const data = await response.json();
        if (data.imageUrl) {
          profileImageUrl.value = `http://localhost:5001${data.imageUrl}`;
        }
      } catch (error) {
        console.error("Upload failed:", error);
        alert("Failed to upload image");
      }
    };

    // Trigger file input
    const triggerFileInput = () => {
      document.getElementById("profilePictureInput").click();
    };

    onMounted(() => {
      fetchUserData();
    });

    return { 
      accountInfo, 
      profileImageUrl, 
      handleFileUpload, 
      triggerFileInput,
      handleImageError
    };
  },
};
</script>

<style scoped>
.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 32px;
  gap: 20px;
}

.profile-image {
  width: 100px;
  height: 100px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 50%;
  border: 2px solid #e2e8f0;
  flex-shrink: 0;
}

.profile-info {
  flex-grow: 1;
  min-width: 0;
}

.profile-name {
  color: #f8f9fa;
  font-size: 22px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.profile-email {
  color: rgba(248, 249, 250, 0.7);
  font-size: 14px;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.edit-profile {
  background-color: #14532d;
  color: #f8f9fa;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  flex-shrink: 0;
}

.edit-profile:hover {
  background-color: #1a6e3a;
}

@media (max-width: 640px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
    gap: 12px;
  }

  .profile-info {
    margin: 0;
    text-align: center;
  }

  .edit-profile {
    width: 100%;
    max-width: 200px;
  }
}
</style>