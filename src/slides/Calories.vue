<template>
  <div class="slide">
    <h1>You consumed a total of</h1>
    <h2>{{ stats.amount }} Calories</h2>
    <h2>That's equal to {{ stats.tostis }} Tostis!</h2>
    <div class="tostis">
      <img v-for="n in stats.tostis" :src="tosti" :style="`animation-delay: ${(n-1)*(4/stats.tostis)}s`">
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";

import tosti from '@/assets/tosti.png'

const props = defineProps({
  data: {
    required: true
  }
});
const stats = props.data.stats.calories;
const columns = Math.round(Math.sqrt(stats.tostis/2));
</script>

<style scoped>
.slide {
  //background: rgb(34, 78, 255);
  //background: linear-gradient(149deg, rgb(34, 78, 255) 0%, rgb(44, 92, 155) 49%, rgb(42, 40, 100) 98%);
  background: rgb(119,75,198);
  background: linear-gradient(48deg, rgba(119,75,198,1) 20%, rgba(135,173,250,1) 87%);
  text-align: center;
}

.container {
  display: flex;
  align-items: center;
  height: 40em;
}

.tostis {
  position: absolute;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap-reverse;
  justify-content: center;
  padding: 0 1rem;
  gap: .5rem;
  width: auto;
  bottom: 1rem;
  left: 0;
}

.tostis img {
  width: v-bind('`calc(calc(100% - calc(.5rem * ${columns - 1})) / ${columns})`');
  animation: drop 1s forwards cubic-bezier(0.175, 0.885, 0.32, 1.025);
  transform: translateY(-100svh);
}

@keyframes drop {
  to {
    transform: translateX(0);
  }
}
</style>
