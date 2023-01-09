<template>
  <div class="slide">
    <h1>You spent a total of</h1>
    <h2>€{{ stats.amount.toFixed(2) }}</h2>
    <h2>That could have gotten you <b>{{ Math.floor(stats.amount/0.30) }}</b> Torondos!</h2>
    <h1>Together with your other Proto members you spent a total of €{{ stats.total.toFixed(2) }}</h1>
    <img :src="cookieMonster"/>
  </div>
</template>

<script setup>
import cookieMonster from '@/assets/cookiemonster.png';

const props = defineProps({
  data: {
    required: true
  }
});
const stats = props.data.stats.totalSpent;
</script>

<style scoped>
.slide {
  text-align: center;
  background: brown;
}

img {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
}
</style>
