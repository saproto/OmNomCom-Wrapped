<template>
  <div class="slide">
    <h1>You consumed a total of</h1>
    <h2>{{ stats.amount }} Calories</h2>
    <h2>That's equal to {{ stats.beers }} beers!</h2>
    <h3>Only about {{ stats.actualBeers }} of those were actual beers.</h3>
  </div>
</template>

<script setup>
import {ref} from "vue";

const props = defineProps({
  data: {
    required: true
  }
});
const stats = props.data.stats.calories;
</script>

<style scoped>
.slide {
  background: rgb(34,78,255);
  background: linear-gradient(149deg, rgb(34,78,255) 0%, rgb(44, 92, 155) 49%, rgb(42, 40, 100) 98%);
  text-align: center;
}
</style>
