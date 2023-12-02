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
    <div class="placeholder" :style="`background-image: url(${unicorn})`"></div>
    <div class="container">
      <div class="grayscale" :style="`background-image: url(${unicorn})`"></div>
      <div class="color" :style="`background-image: url(${unicorn}); animation-iteration-count: ${stats.percentage}; animation-duration: ${4/stats.percentage}s`"></div>
    </div>
  </div>
</template>

<script setup>
import unicorn from '@/assets/unicorn.png'

const props = defineProps({
  data: {
    required: true
  }
});
const stats = props.data.stats.willToLives;
</script>

<style scoped>
.slide {background: rgb(243,127,247);
  background: linear-gradient(236deg, rgba(243,127,247,1) 0%, rgba(251,196,131,1) 51%, rgba(0,212,255,1) 100%);
  text-align: center;
  text-shadow: 0 0 .2rem #000000;
}

.container {
  position: relative;
  height: 40em;
}

.container div {
  position: absolute;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: calc(50vw - 12em) calc(50svh - 5em);
  width: 100%;
  height: 17em;
}

.grayscale {
  filter: grayscale(100%);
  top: 9em;
}

.color {
  top: 10em;
  animation: fillColor 6s forwards linear;
}

.placeholder {
  background-repeat: no-repeat;
  filter: grayscale(100%);
  position: absolute;
  top: 20.4rem;
  left: 2.5rem;
  width: 100%;
  height: 17em;
}

@keyframes fillColor {
  from {
    top: 23em;
  }
}
</style>
