<script setup>
import Navbar2 from '@/components/Navbar2.vue';
import Footer from '@/components/Footer.vue';
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from 'vue-router';
import authHelper from '@/auth/authHelper';

const router = useRouter();
const expenses = ref([]);
const searchQuery = ref('');

let tokenCheckInterval;

const checkTokenValidity = () => {
  if (!authHelper.isAuthenticated()) {
    authHelper.logout();
    router.push('/login');
  }
};

onMounted(() => {
  checkTokenValidity();
  tokenCheckInterval = setInterval(checkTokenValidity, 5 * 1000); // Check every 5 sec
  fetchExpenses();
});

onUnmounted(() => {
  clearInterval(tokenCheckInterval);
});

async function fetchExpenses() {
  try {
    const token = localStorage.getItem("token")
    const response = await fetch('http://localhost:5001/servers/getpayment', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (response.status === 401) {
      authHelper.logout();
      router.push('/login');
      return;
    }
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    expenses.value = data;
  } catch (error) {
    console.error('Error fetching report data:', error);
    if (error.message === 'Unauthorized' || error.response?.status === 401) {
      authHelper.logout();
      router.push('/login');
    }
  }
}

</script>


<template>
  <div class="min-h-screen flex flex-col">
    <Navbar2 />
    <main class="flex-grow">
      <div class="cBody">
        <div class="report-container">

          <h1>MATUMIZI</h1>
          <!-- Data Table -->
          <table>
            <thead>
              <tr>
                <th>Bili</th>
                <th>Namba</th>
                <!-- <th>Mtandao</th> -->
                <th>Kiasi</th>
                <th>Muamala</th>
                <th>Tarehe</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="expense in expenses" :key="expense.bill">
                <td>{{ expense.bill }}</td>
                <td>{{ expense.pNumber }}</td>
                <!-- <td>{{ expense.mPayment }}</td> -->
                <td>{{ expense.amount }}</td>
                <td>{{ expense.reference }}</td>
                <td>{{ expense.date }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>


<style scoped>

h1{
  /* margin-top: 2px; */
  margin-bottom: 25px;
  font-size: 24px;
}


.cBody {
  padding: 20px;
  /* background-color: #f7f7f7; */
}

.report-container{
  max-width: 800px;
  margin: auto;
  padding: 50px;
  background: #333;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* text-align: center; */
}



.search-container {
  margin-bottom: 20px;

}

.search-bar {
  padding: 8px;
  background-color: white;
  /* border: 1px solid #ddd; */
  border-radius: 4px;
  width: 500px;
  
}


table {
    width: 100%;
    text-align: center;
    box-shadow: 2px 4px 8px black;
    background-color: #1a1a1a;
    color: #fff; /* White text color */
  }
  
  th, td {
    padding: 20px;
    border: 1px solid #555; /* Dark gray border for a subtle effect */
  }
  
  tr:nth-child(even) {
    background-color: #333;
  }
  
  tr:hover {
    background-color: #333; /* Dark gray on hover for contrast */
  }

  th {
    background-color: black;
    color: #ccc; /* White text for the header */
  }

  td {
    color: #ccc; /* Light gray text for better readability */
  }
</style>