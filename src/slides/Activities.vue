<template>
  <div class="slide">
    <h2>You paid for a total of</h2>
    <h1 style="color: powderblue"><span class="dynamic">{{ stats.amount }}</span> Activities</h1>
    <h2>Which cost you a total of <p class="amount-spent dynamic"> €{{ stats.spent }}!</p></h2>
    <div class="activity-container">
      <div v-for="(activity, idx) in stats.all" class="move-up" :style="`animation-delay: ${(idx-5)*(delay)}s`">
        <div class="activity"
             :style="`background-image: linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url(${activity.image_url})`">
          <div class="title">
            {{ activity.title }}
          </div>
          <div class="footer">
            <div class="date">
              {{ activity.formatted_date.simple }}
            </div>
            <div class="location">
              {{ activity.location }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const delay = 1;

const props = defineProps({
  data: {
    required: true
  }
});
const stats = props.data.stats.activities;
</script>

<style scoped>

.slide {
  background: linear-gradient(149deg, #BF1363 0%, #F39237 49%, rgb(42, 40, 100) 98%);
  text-align: center;
}
.dynamic{
  color:#8ACDEA;
}

.amount-spent {
  color: lawngreen;
  display: inline-block;
}

.activity-container {
  background: rgba(170,170,170,0.5);
  border-radius: 2rem;
  overflow: hidden;
  margin-top: 3rem;
  height: 35rem;
}

.move-up {
  position: absolute;
  animation: move infinite linear;
  animation-duration: v-bind('`${delay*stats.amount}s`');
  bottom: 0;
  opacity: 1;
  text-align: start;
  text-wrap: none;
  white-space: nowrap;
  width: 100%;
  transform: translateY(7rem);
  padding: 0 1rem;
}

.activity {
  text-align: start;
  padding: 0 .3rem;
  font-size: 1.5rem;
  border-radius: .5rem;
  height: 5rem;
  display: flex;
  justify-content: space-evenly;
  margin-bottom: .5rem;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  flex-direction: column;
}


.title {
  text-wrap: none;
  text-overflow: ellipsis;
  overflow: hidden;
}

.footer {
  color: #cccccc;
  font-size: .8em;
  display: flex;
  justify-content: space-between;
  gap: 2rem;
}

.footer div {
  overflow: hidden;
  text-overflow: ellipsis;
}

.date {
  flex-shrink: 0;
}

@keyframes move {
  0% {
    transform: translateY(7rem);
  }

  100% {
    transform: v-bind('`translateY(min(-35rem, ${-5*1.5*stats.amount}rem))`');
  }
}
</style>
