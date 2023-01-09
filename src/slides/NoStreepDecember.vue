<template>
  <div class="slide">
    <h1>In case you tried to participate in No-Stripe-December:</h1>
    <div v-if="stats.complete">
      <h2>You made it!</h2>
      <h2>Congratulations!</h2>
    </div>
    <div v-else>
      <h2>You failed!</h2>
      <h3>You still bought {{ stats.items }} items in December.</h3>
    </div>
    <h2>{{ stats.winners }} others managed to complete it.</h2>
  </div>
</template>

<script setup>
import {ref} from "vue";

const props = defineProps({
  data: {
    required: true
  }
});
const stats = props.data.stats.december;
</script>

<style scoped>
.slide {
  text-align: center;
}
</style>
