<template>
  <div class="slide">
    <div class="content">
      <h2>You paid for a total of</h2>
      <h1>{{ stats.amount }} Activities</h1>
      <h2>Which cost you a total of <p class="amount-spent"> €{{ stats.spent }}!</p></h2>
    </div>
    <div class="activity-container">
      <div v-for="(activity, idx) in activities" class="move-up" :style="`animation-delay: ${idx/(activities.length)*20 - 5}s`">
        <div class="activity" :style="`background-image: url(${activity.image_url})`">
          <div class="title">
            {{activity.title}}
          </div>
          <div class="footer">
            <div>
              {{activity.formatted_date.simple}}
            </div>
            <div>
              {{activity.location}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="viewport">
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
const activities = props.data.wrapped.events
</script>

<style scoped>
.viewport{
  position: absolute;
  left: .5em;
  top: 14em;
  width: 28em;
  height: 33em;
  border-radius: 3em;
  box-shadow: 0 0 0 99999px deepskyblue;
}
.slide {
  background: linear-gradient(149deg, #BF1363 0%, #F39237 49%, rgb(42, 40, 100) 98%);
  text-align: center;
}

.amount-spent{
  color:red;
  display: inline-block;
}

.activity-container {
  height:100%
}
.move-up{
  position: absolute;
  animation:move 20s infinite linear;
  bottom: 0;
  opacity: 1;
  text-align: start;
  text-wrap: none;
  width: 100%
}
.activity{
  text-align: start;
  padding-left: .3em;
  padding-right: .3em;
  font-size: 1.5em;
  border-radius: .5em;
  height: 3em;
  display: flex;
  margin-bottom: .5em;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  flex-direction: column;
}


.title{
  text-wrap: none;
  overflow: hidden;
}
.content{
  z-index: 2;
  border-radius: .5em;
  margin-top: 3em;
}

.footer{
  display: flex;
  justify-content: space-between;
}

@keyframes move {
  0% {
transform:translateY(0);
  }

  100% {
    transform:translateY(-350rem);
  }
}
</style>
