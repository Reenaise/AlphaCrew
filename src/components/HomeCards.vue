<script setup>
import { RouterLink } from 'vue-router';
import Card from '@/components/Card.vue';
import image from '@/assets/img/image.png';
import { ref, onMounted } from 'vue';

const headerText = "Kuimarisha wajasiriamali kwa ufuatiliaji rahisi wa rekodi za mapato na matumizi.";
const paragraphText = "Tunawasaidia wajasiriamali walio rasmi kuwa na taarifa kuhusu mapato na matumizi yao ili wawe na muhtasari mzuriwa fedha\nzao";

const displayHeaderText = ref('');
const displayParagraphText = ref('');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const typeText = async (text, displayRef) => {
  displayRef.value = '';  // Clear the text before starting
  for (let i = 0; i < text.length; i++) {
    displayRef.value += text[i];
    await sleep(50); // Typing speed
  }
};

const animateLoop = async () => {
  while (true) {  // Infinite loop
    // Type header text
    await typeText(headerText, displayHeaderText);
    // Type paragraph text
    await typeText(paragraphText, displayParagraphText);
    
    // Wait for 2 seconds
    await sleep(5000);
    
    // Clear both texts (optional - for a fade effect)
    displayHeaderText.value = '';
    displayParagraphText.value = '';
    
    // Small pause before starting again
    await sleep(500);
  }
};

onMounted(() => {
  animateLoop();
});
</script>

<template>
  <div class="bg-customGreen min-h-screen">
    <section class="flex-grow -mt-38 min-h-screen flex items-stretch">
      <div class="container-xl lg:container m-auto flex-grow">
        <div class="grid grid-cols-1 md:grid-cols-2 h-full -mt-40">
          <Card bg="bg-customGreen" class="h-96 flex flex-col justify-center items-center">
            <div class="text-center w-full px-4">
              <h2 class="text-3xl font-bold mb-4 border-b border-white/60 pb-4"
                  :class="{ 'fade-transition': true }">
                {{ displayHeaderText }}
              </h2>
              <p class="mt-3 mb-1 text-xl"
                 :class="{ 'fade-transition': true }"
                 style="white-space: pre-line">
                {{ displayParagraphText }}
              </p>
            </div>
            <div>
            <!-- <section v-if="showButton" class="m-auto max-w-lg my-10 px-6 bg-customGreen"> -->
            
            <!-- <RouterLink
              to="/jobs"
              class="block bg-black text-white text-center py-4 px-6 rounded-lg px-1 hover:bg-customGreen"
            >
              Get started
            </RouterLink> -->
            <!-- </section> -->
            </div>
          </Card>
          <Card bg="bg-customGreen"class="h-96 flex flex-col justify-between">
            <div class="image-container">
              <img class="zoom-image" :src="image" alt="Vue Jobs" />
            </div>
          </Card>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
// export default {
//   data() {
//     return {
//       showButton: false, // Define the property here
//     };
//   },
// };
</script>


<style>


.bg-customGreen {
  background-color: #1A1A1A ; /* Path to your background iFFFFFFmage */
  background-size: cover; /* Ensures the image covers the entire element */
  background-repeat: no-repeat; /* Prevents the image from repeating */
  background-position: center center; /* Centers the image in the element */
}

.image-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.zoom-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.zoom-image:hover {
  transform: scale(1.1);
}

.fade-transition {
  transition: opacity 0.5s ease-in-out;
}

.fade-transition:empty {
  opacity: 0;
}

.fade-transition:not(:empty) {
  opacity: 1;
}
</style>