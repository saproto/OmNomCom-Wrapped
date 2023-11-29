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
  background: rgb(34,78,255);
  background: linear-gradient(149deg, rgb(34,78,255) 0%, rgb(44, 92, 155) 49%, rgb(42, 40, 100) 98%);
  text-align: center;
}
</style>
