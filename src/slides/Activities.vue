<template>
  <div class="slide">
    <h1>You paid for a total of</h1>
    <h2>{{ stats.amount }} Activities</h2>
    <h2>Which cost you a total of €{{ stats.spent }}!</h2>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    required: true
  }
});
const stats = props.data.stats.activities;
</script>

<style scoped>
.slide {
  text-align: center;
}
</style>
