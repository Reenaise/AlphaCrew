<template>
  <div class="min-h-screen flex flex-col">
    <Navbar2 />
    <main class="flex-grow">
      <div class="cBody">
        <div class="report-container">
          <h1>MAPATO</h1>
          <!-- Data Table -->
          <table>
            <thead>
              <tr>
                <th>Mtandao</th>
                <th>Namba</th>
                <th>Pato</th>
                <th>Muamala</th>
                <th>Tarehe</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="income in incomes" :key="income.reference">
                <td>{{ income.mPayment }}</td>
                <td>{{ income.pNumber }}</td>
                <td>{{ income.amount }}</td>
                <td>{{ income.reference }}</td>
                <td>{{ income.date }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar2 from '@/components/Navbar2.vue';
import Footer from '@/components/Footer.vue';
import { ref, onMounted } from 'vue';

const incomes = ref([]);
const searchQuery = ref('');

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:5001/servers/getincome');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    incomes.value = data;
  } catch (error) {
    console.error('Error fetching report data:', error);
  }
});
</script>

<style scoped>
/* .report-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* background-color: #43B02A;   */
  /* font-weight: 500; */
  /* margin: 20px; */
  /* font-family: Arial, sans-serif; */



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


h1{
  /* margin-top: 25px; */
  margin-bottom: 25px;
  font-size: 24px;
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
    color: #ccc;
    }

  td {
    color: #ccc; /* Light gray text for better readability */
  }
</style>

/* Add this to ensure proper footer positioning */
.min-h-screen {
  min-height: 100vh;
}

.flex-col {
  display: flex;
  flex-direction: column;
}

.flex-grow {
  flex-grow: 1;
}