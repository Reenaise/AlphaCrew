<template>
  <Navbar />

  <div class="cBody">
  <div class="signup-container">
    <h2>UNDA AKAUNTI MPYA</h2>
    <p id="pFirst">Tayari una akaunti? <router-link to="/login">Ingia</router-link></p>
    <form @submit.prevent="submitSignup">
      <div class="form-group">
        <label for="name">Jina</label>
        <input v-model="name" type="text" id="name" required />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="email" type="email" id="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <div class="form-group">
        <label for="dob">Tarehe ya Kuzaliwa</label>
        <input v-model="dob" type="date" id="dob" />
      </div>
      <div class="form-group">
        <label for="incomeRange">Kipato</label>
        <select
        v-model="incomeRange"
        type="text"
        id="incomeRange"
        class="incomeRange"
        required
      >
        <!-- <option value="" disabled>Ingiza mtandao wa simu</option> -->
        <option value="500,000 - 600,000">500,000 - 600,000</option>
        <option value="600,000 - 700,000">600,000 - 700,000</option>
        <option value="700,000 - 800,000">700,000 - 800,000</option>
        <option value="800,000 - 900,000">800,000 - 900,000</option>
        <option value="900,000 - 1,000,000">900,000 - 1,000,000</option>
        <!-- <option value="Mitandao mingine">Mitandao mingine</option> -->
      </select>
      </div>
     
      <div class="button1">
            <button id="button" type="submit">Sajili</button>
          </div>
    </form>
  </div>
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";

import { ref } from "vue";

const name = ref("");
const email = ref("");
const password = ref("");
const dob = ref("");
const incomeRange = ref("");

async function submitSignup() {
  try {
    const response = await fetch("http://localhost:5001/servers/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value,
        dob: dob.value,
        incomeRange: incomeRange.value
      }),
    });
    const data = await response.json();
    alert("Data has been submitted");
    name.value = "";
    email.value = "";
    password.value = "";
    dob.value = "";
    incomeRange.value = "";
    console.log("Registration data stored:", data);
  } catch (error) {
    console.error("Error storing registration data:", error);
  }
}
</script>

<style scoped>

.cBody {
  padding: 20px;
  /* background-color: #f7f7f7; */
  min-height: 100vh;
}

.signup-container {
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
</style>