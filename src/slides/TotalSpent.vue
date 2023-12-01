<template>
  <div class="slide">
    <div class="card">
    <h2>You spent a total of</h2>
    <h1 class="amount">€10.12</h1>
    </div>
    <h2>That could have gotten you </h2>
    <h1 class="torondos"><b>{{ Math.floor(10.12/0.30) }}</b> Torondos!</h1>
    <h3>Together with your other Proto members you spent a total of </h3>
    <h1 class="total">A lot of money!</h1>
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
  padding-top:3em;
}
.amount{
  color:#74ee15;
}
.torondos{
  color:#ffe700;
}
.total{
  color:#4deeea;
}
h1{
  padding-bottom: .5em;
}
img {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
}
</style>
