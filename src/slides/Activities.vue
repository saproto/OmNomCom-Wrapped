<template>
  <div class="slide">
    <h2>You paid for a total of</h2>
    <h1><span class="dynamic">{{ stats.amount }}</span> Activities</h1>
    <h2>Which cost you a total of <p class="amount-spent dynamic"> €{{ stats.spent }}!</p></h2>
    <div class="activity-container">
      <div v-for="(activity, idx) in activities" class="move-up" :style="`font-size: ${12 / activities.length + .3}em; animation-delay: ${idx/(activities.length)*20 - 5}s`">
        {{activity.product.name.replace('Activity:', '')}}
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
const stats = props.data.stats.activities;
const activities = props.data.stats.activities.all
</script>

<style scoped>
.slide {
  background: rgb(34,78,255);
  background: linear-gradient(149deg, rgb(34,78,255) 0%, rgb(44, 92, 155) 49%, rgb(42, 40, 100) 98%);
  text-align: center;
}



.amount-spent{
  color:red;
  display: inline-block;
}

.activity-container {
  height: 83%;
  overflow: hidden;
}
.move-up{
  position: absolute;
  animation:move 20s infinite linear;
  bottom: 0;
  opacity: 0;
  text-align: start;
  text-wrap: none;
  line-height:.9em;
}
@keyframes move {
  0% {
transform:translateY(0);
    opacity: 0;
  }

  10%{
    opacity: 0;
  }

  20% {
    opacity: 1;
  }

  80% {
    opacity: 1;
  }


  90%{
    opacity: 0;
  }

  100% {
    transform:translateY(-40rem);
    opacity: 0;
  }
}
</style>
