<template>
    <Navbar2 />
    
      <div class="report-container">
        <h1>Mapato</h1>
      
        
        <!-- Data Table -->
        <table>
          <thead>
            <tr>
              <th>Pato Lako</th>
              <th>Mtandao</th>
              <th>Muamala</th>
              <th>Tarehe</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="income in incomes" :key="income.reference">
          <td>{{ income.amount }}</td>
          <td>{{ income.mPayment }}</td>
          <td>{{ income.reference }}</td>
          <td>{{ income.date }}</td>
        </tr>
          </tbody>
        </table>
      </div>
    </template>
    
    
    
    
    <script setup>
    import Navbar2 from '@/components/Navbar2.vue';
    import { ref, onMounted, computed } from 'vue';
    
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
    
    h1{
      margin-top: 25px;
      margin-bottom: 25px;
      font-size: x-large;
    }
    
    
    .report-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      /* background-color: #43B02A;   */
      font-weight: 500;
      /* margin: 20px; */
      /* font-family: Arial, sans-serif; */
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
      box-shadow: 2px 4px 8px;
      /* border-right: #555555;
      border-left: #555555; */
      /* margin-right: 50px;
      margin-left: 60px; */
      /* border-collapse: collapse; */
    }
    
    th, td {
      /* border: 1px solid #ddd; */
      padding: 20px;
    
      /* box-shadow: 0 1px 1px; */
      /* border-top: solid 1px black; */
     
    }
    
    tr {
      /* border: 1px solid #ddd; */
      padding: 8px;
      box-shadow: 0 0 1px;
      /* border-top: solid 1px black; */
     
    }
    </style>