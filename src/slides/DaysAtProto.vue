<template>
  <div class="slide">
    <h1>This year you used the OmNomCom</h1>
    <h2>{{ stats.amount }} days</h2>
    <h2>On average you bought {{ (stats.items/stats.amount).toFixed(1) }} items per day!</h2>
  </div>
</template>

<script setup>
import {ref} from "vue";

const props = defineProps({
  data: {
    required: true
  }
});
const stats = props.data.stats.days;
</script>

<style scoped>
.slide {
  background: rgb(34,78,255);
  background: linear-gradient(149deg, rgb(34,78,255) 0%, rgb(44, 92, 155) 49%, rgb(42, 40, 100) 98%);
  text-align: center;
}
</style>
