<template>
  <section class="profile-header">
    <div class="profile-image" role="img" aria-label="Profile picture"></div>
    <div class="profile-info">
      <h1 class="profile-name">John Doe</h1>
      <p class="profile-email">john@example.com</p>
    </div>
    <button class="edit-profile" type="button">Edit Profile</button>
  </section>
</template>

<script>
export default {
  name: "ProfileHeader",
};
</script>

<style scoped>
.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 32px;
}

.profile-image {
  width: 120px;
  height: 120px;
  background-color: #d9d9d9;
  border-radius: 50%;
}

.profile-info {
  margin-left: 24px;
  flex-grow: 1;
}

.profile-name {
  color: #f8f9fa;
  font-size: 32px;
  font-weight: 700;
  line-height: 48px;
}

.profile-email {
  color: rgba(248, 249, 250, 0.5);
  font-size: 16px;
  line-height: 24px;
}

.edit-profile {
  background-color: #14532d;
  color: #f8f9fa;
  border: none;
  border-radius: 4px;
  padding: 12px 24px;
  font-size: 16px;
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
