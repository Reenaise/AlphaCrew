<template>
  <Navbar/>

  <div class="cBody">
  <div class="login-container">
    <h2>INGIA</h2>
    <p id="pFirst">Umesajili? <router-link to="/register" class="link">Sajili</router-link></p>
    
    <!-- Display error message if there's any -->
    
    <form @submit.prevent="submitLogin">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          v-model="email"
          type="email"
          id="email"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          v-model="password"
          type="password"
          id="password"
          required
        />
      </div>
      <div class="button1">
            <button id="button" type="submit">Ingia</button>
          </div>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
  </div>
  </div>
  
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const errorMessage = ref(''); // Holds error messages
const router = useRouter();

async function submitLogin() {
  try {
    const response = await fetch('http://localhost:5001/servers/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      // If login is successful, redirect to the home page
      router.push('/home2');
    } else {
      // Set error message for invalid credentials
      errorMessage.value = data.error || 'Invalid email or password';

    }
  } catch (error) {
    // Handle any errors during the request
    errorMessage.value = 'An error occurred. Please try again later.';
  }
}
</script>


<style scoped>

.cBody {
  padding: 20px;
  /* background-color: #f7f7f7; */
  min-height: 100vh;
}

.login-container {
  max-width: 800px;
  margin: auto;
  padding: 50px;
  background: #333;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* text-align: center; */
}

h2 {
  font-size: 24px;
  margin-bottom: 10px;
  /* color: #333; */
}

#pFirst {
  font-size: 14px;
  margin-bottom: 16px;
  /* color: #555; */
}

a {
  /* color: black; */
  text-decoration: underline;
}

.cForm {
  margin-top: 20px;
}


label {
  font-size: 14px;
  /* color: #333; */
  margin-bottom: 5px;
}

input {
  padding: 10px;
  border: 1px solid #333;
  border-radius: 4px;
  font-size: 14px;
  background-color: #1A1A1A;
  width: 100%;
  /* color: #F8F9FA; */
}


select {
  padding: 10px;
  border: 1px solid #333;
  border-radius: 4px;
  font-size: 14px;
  background-color: #1A1A1A;
  width: 100%;
  /* color: #F8F9FA; */
}

input:focus,
select:focus {
  /* border-color: #43b02a; */
  outline: none;
}

.button1 {
  text-align: center;
  margin-top: 20px;
  
}

#button {
  background-color: #14532D;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}


#button:hover {
  background-color: #14532D;
}

.error-message {
  color: red; /* Style the error message */
  margin-top: 20px;
}

</style>
