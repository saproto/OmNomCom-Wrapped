<template>
  <div class="slide">
    <h1>This past year you used the OmNomCom <i class="header-text">{{ stats.amount }} days</i></h1>
    <div class="calendar-container">
      <div v-for="month in 12" :key="month" style="width:100%">
        <i>
          {{months[month-1][0]}}
        </i>
        <div class="calendar">
        <div v-for="day in 31" :key="day" class="day" :class="[isActive(month, day)?'active':'', months[month-1][1]>=day?'inactive':'']">
        </div>
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
const stats = props.data.stats.days;
const omnomcomdays = props.data.stats.omnomcomdays;
const months= [['January', 31], ['February', 28], ['March', 31], ['April',30], ['May',31], ['June', 30], ['July',31], ['August',31], ['September',30], ['October',31], ['November',30], ['December',31]]
function isActive(month, day){
  return omnomcomdays.has(`${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
}
</script>

<style scoped>
.slide {
  background: rgb(34,78,255);
  background: linear-gradient(149deg, rgb(34,78,255) 0%, rgb(44, 92, 155) 49%, rgb(42, 40, 100) 98%);
  text-align: center;
  display: flex;
  flex-direction: column;
}

.day{
  gap:2px;
  aspect-ratio: 1/1;
  border-radius: .2em;
}

.inactive{
  background: #AB87FF;
}

.header-text{
  color:#C0FF33;
}

.active{
  background: #C0FF33;
}
.calendar{
  aspect-ratio: 1/1;
  background: #272D2D90;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  justify-content: space-evenly;
  align-items: center;
  gap:.2em;
  border-radius: .5em;
  padding: .5em;
  width:100%;

}
.calendar-container{
  display: grid;
  gap:15px;
  grid-template-columns: repeat(3, 1fr);
}
</style>
