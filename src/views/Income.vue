<template>
  <div class="min-h-screen flex flex-col">
    <Navbar2 />
    <main class="flex-grow">
      <div class="cBody">
        <div class="cContainer">
          <h1>MAPATO</h1>
          <p id="pFirst">Tafadhali, ingiza taarifa kuhusu mapato:</p>

          <div class="cForm">
            <form @submit.prevent="submitPayment">
              

              <div class="field2">
                <label for="pNumber" id="pNumber">Namba ya simu</label>
                <br>
                <input
                  v-model="phoneNumber"
                  type="tel"
                  id="pNumber"
                  class="inputNumber"
                  required
                  pattern="[0-9]{10}"
                  title="Please enter a valid phone number (10 digits)"
                />
              </div>

              <div class="field3">
                <label for="mPayment" id="mPayment">Mtandao</label>
                <br>
                <!-- <input v-model="mobilePayment" type="text" id="mPayment" class="inputPayment" required /> -->
                <select
                  v-model="mobilePayment"
                  type="text"
                  id="mPayment"
                  class="inputPayment"
                  required
                >
                  <!-- <option value="" disabled>Ingiza mtandao wa simu</option> -->
                  <option value="m-pesa">m-pesa</option>
                  <option value="Tigopesa">Tigopesa</option>
                  <option value="Halopesa">Halopesa</option>
                  <option value="airtelmoney">airtelmoney</option>
                  <!-- <option value="Mitandao mingine">Mitandao mingine</option> -->
                </select>
              </div>

              <div class="field4">
                <label for="amount" id="amount">Kiasi</label>
                <br>
                <input
                  v-model="amount"
                  type="text"
                  id="amount"
                  class="amount"
                  required
                />
                <!-- <select v-model="amount" type="text" id="amount" class="amount" required >
              <option value="" disabled>Ingiza kiasi</option>
              <option value="10000">10000</option>
              <option value="20000">20000</option>
              <option value="30000">30000</option>
              <option value="40000">40000</option>
            </select> -->
              </div>

              <div class="field4">
                <label for="dob" id="dob">Tarehe:</label>
                <br>
                <input v-model="dob" type="date" id="dob" />
              </div>

              <div class="field1">
                <label for="reference" id="reference"
                  >Utambulisho wa Muamala</label
                > 
                <br>
                <input
                  v-model="reference"
                  type="text"
                  id="reference"
                  class="reference"
                  required
                />
              </div>

              <div class="button1">
                <button id="button" type="submit">Tuma</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar2 from "@/components/Navbar2.vue";
import Footer from '@/components/Footer.vue';
import { ref } from "vue";

const reference = ref("");
const phoneNumber = ref("");
const mobilePayment = ref("");
const amount = ref("");
const dob = ref("");

async function submitPayment() {
  try {
    const response = await fetch("http://localhost:5001/servers/income", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pNumber: phoneNumber.value,
        mPayment: mobilePayment.value,
        amount: amount.value,
        date: dob.value,
        reference: reference.value,
      }),
    });;
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    alert("Data has been submitted");
    reference.value = "";
    phoneNumber.value = "";
    mobilePayment.value = "";
    amount.value = "";
    dob.value = "";
    console.log("Payment data stored:", data);
  } catch (error) {
    console.error("Error storing payment data:", error);
  }
}
</script>

<style scoped>

.cBody {
  padding: 20px;
  /* background-color: #f7f7f7; */
  min-height: 100vh;
}

.cContainer {
  max-width: 800px;
  margin: auto;
  padding: 50px;
  background: #333;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* text-align: center; */
}

h1 {
  font-size: 24px;
  margin-bottom: 10px;
  /* color: #333; */
}

#pFirst {
  font-size: 14px;
  margin-bottom: 16px;
  /* color: #555; */
}

.cForm {
  margin-top: 20px;
}

.field {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  text-align: left;
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
  margin-bottom: 15px;
  /* color: #F8F9FA; */
}


select {
  padding: 10px;
  border: 1px solid #333;
  border-radius: 4px;
  font-size: 14px;
  background-color: #1A1A1A;
  width: 100%;
  margin-bottom: 15px;
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