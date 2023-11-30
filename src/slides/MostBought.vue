<template>
  <div class="slide">
    <h1>Your most loved product this year was:</h1>
    <div style="height: 8rem; display: flex; justify-content: center">
    <div class="product-card pulse">
      <img :src="stats.items[0][0]['image_url']"/>
      <div>
        <h2>{{ stats.items[0][0]['name'] }}</h2>
      </div>
    </div>
    </div>
    <h2>You bought a total of <b>{{ stats.items[0][1] }}</b> of them!</h2>
    <h4 v-if="stats.percentile === 0">You're the top buyer of this product!</h4>
    <h4 v-else>That puts you in the top {{ stats.percentile }}% buyers of this product.</h4>
    <h4>Your other favourite products were:</h4>
    <br>
    <div class="product-list">
      <div class="product-line" v-for="(item, index) in stats.items.slice(1, 5)">
        <div>{{ index+2 }}.</div>
        <div class="product-card">
          <img v-if="item[0]['image_url']" :src="item[0]['image_url']"/>
          <h2>{{ item[0]['name'] }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    required: true
  }
});
const stats = props.data.stats.mostBought;
</script>

<style scoped>
.slide {
  background: rgb(34,78,255);
  background: linear-gradient(149deg, rgba(34,78,255,1) 0%, rgba(44,149,155,1) 49%, rgba(38,159,108,1) 98%);
  text-align: center;
}

.product-card {
  background: rgba(200,200,200,.6);
  border-radius: 1em;
  color: black;
  padding: 0;
  display: flex;
  justify-content: start;
  flex-direction: row;
  align-items: center;
  gap: 1em;
  box-shadow: rgba(255,255,255,.2) 0 0 .3rem .3rem;
}

.product-card img {
  border-radius: 1em 0 0 1em;
  height: 100%;
}

.product-list {
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 1em;
}

.product-list .product-line {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}

.product-list .product-card {
  height: 4em;
  width: 23em;
}

.pulse{
  width:90%;
  height:100%;
  scale:1;
  animation: pulse 2s infinite ease-in-out;
}

@keyframes pulse {
  0% {
    transform: scale(0.98);
    box-shadow: 0 0 0 0 #C0FF3380;
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px #C0FF3300;
  }

  100% {
    transform: scale(0.98);
    box-shadow: 0 0 0 0 #C0FF3300;
  }
}
</style>
