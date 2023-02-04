<template>
  <div class="slide">
    <h1>This year you attended</h1>
    <h1>
      <img :src="spilledBeer" style="width: 10rem;"/>
      {{ stats.amount }} drinks
    </h1>
    <h2>On average you consumed {{ (stats.alcoholic+stats.nonAlcoholic)/stats.amount }} per drink!</h2>
    <h2>
      <img :src="beugel" style="height: 1em"/>
      = Alcoholic
      <img :src="lemonade" style="width: 1em"/>
      = Non-Alcoholic
    </h2>
    <div id="beerStats">
      <div v-for="i in 100">
        <img :src="i > 58/*stats.alcoholic/stats.amount*100*/ ? lemonade : beugel" style="width: 2.5rem"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import spilledBeer from "@/assets/spilledbeer.svg";
import beugel from "@/assets/beugel.webp";
import lemonade from "@/assets/lemonade.png";

const props = defineProps({
  data: {
    required: true
  }
});
const stats = props.data.stats.drinks;
</script>

<style scoped>
.slide {
  background: rgb(34,78,255);
  background: linear-gradient(149deg, rgb(34,78,255) 0%, rgb(44, 92, 155) 49%, rgb(42, 40, 100) 98%);
  text-align: center;
}

#beerStats {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
}
</style>
