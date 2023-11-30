<template>
  <div class="slide">
    <h2>You paid for a total of</h2>
    <h1>{{ stats.amount }} Activities</h1>
    <h2>Which cost you a total of <p class="amount-spent"> €{{ stats.spent }}!</p></h2>
    <div class="activity-container">
      <div v-for="activity in stats.all">
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
</style>
