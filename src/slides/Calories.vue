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
  text-align: center;
}
</style>
