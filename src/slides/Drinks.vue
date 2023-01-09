<template>
  <div class="slide">
    <h1>This year you attended</h1>
    <h2>{{ stats.amount }} drinks</h2>
    <h2>On average you consumed {{ (stats.alcoholic+stats.nonAlcoholic)/stats.amount }} per drink!</h2>
    <h3>{{ stats.alcoholic/stats.amount}} of which were alcoholic and {{ stats.nonAlcoholic/stats.amount }} non-alcoholic!</h3>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    required: true
  }
});
const stats = props.data.stats.drinks;
</script>

<style scoped>
.slide {
  text-align: center;
}
</style>
