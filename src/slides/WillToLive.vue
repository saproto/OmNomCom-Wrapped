<template>
  <div class="slide">
    <h1>This year you needed</h1>
    <h1>{{ stats.amount }} will to lives.</h1>
    <h2>That places you in the top {{ stats.percentile }}%</h2>

    <h2 v-if="stats.percentile > 80">Must have been a great year.</h2>
    <h2 v-else-if="stats.percentile > 50">Must have been an average year.</h2>
    <h2 v-else-if="stats.percentile > 30">Must have been an rough year.</h2>
    <h2 v-else-if="stats.percentile > 10">Are you okay?</h2>
    <h2 v-else>At least next year can't get any worse.</h2>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    required: true
  }
});
const stats = props.data.stats.willToLives;
</script>

<style scoped>
.slide {
  background: rgb(35, 112, 9);
  background: linear-gradient(180deg, rgb(35, 112, 9) 0%, rgb(133, 6, 21) 98%);
  text-align: center;
}
</style>
