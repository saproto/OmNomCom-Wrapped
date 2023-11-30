<script setup>
import {ref} from "vue";
import {toBlob, toPng} from "html-to-image";
import TotalSpent from "@/slides/TotalSpent.vue";
import MostBought from "@/slides/MostBought.vue";
import Calories from "@/slides/Calories.vue";
import Drinks from "@/slides/Drinks.vue";
import WillToLive from "@/slides/WillToLive.vue";
import DaysAtProto from "@/slides/DaysAtProto.vue";
import NoStreepDecember from "@/slides/NoStreepDecember.vue";
import Activities from "@/slides/Activities.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const props = defineProps({
  data: {
    required: true
  }
});
const stats = props.data.stats;

const currentSlide = ref(0);
const touched = ref(false);
const transition = ref('slide-left');
const slide = ref(null);

let slides = [
  [TotalSpent, 10],
  [MostBought, 10],
  [Calories, 10],
  [Drinks, 10],
  stats.willToLives <= 0 || [WillToLive, 10],
  [DaysAtProto, 10],
  // [NoStreepDecember, 10],
  stats.activities <= 0 || [Activities, 10],
];

slides = slides.filter(x => x !== true);

const shareSlide = async () => {
  try {
    const options = {
      cacheBust: false,
      pixelRatio: 2,
      includeQueryParams: true
    };
    if (navigator.share) {
      const blob = await toBlob(slide.value, options);
      const imgFile = new File([blob], 'OmNomComWrapped2022.png', {type: 'image/png'});
      navigator.share({
        title: 'OmNomComWrapped 2022',
        text: 'Look at my OmNomCom Wrapped of 2022',
        files: [imgFile],
        url: window.location.href,
      });
    } else {
      const dataUrl = await toPng(slide.value, options);
      const link = document.createElement('a');
      link.download = 'OmNomComWrapped2022.png';
      link.href = dataUrl;
      link.click();
    }
  } catch (e) {
    console.log(e);
  }
}
const nextSlide = () => {
  transition.value = 'slide-left';
  if (currentSlide.value === slides.length - 1) return;
  currentSlide.value += 1;
}

const prevSlide = () => {
  transition.value = 'slide-right';
  if (currentSlide.value === 0) return;
  currentSlide.value -= 1;
}

currentSlide.value = 0;
// slides[currentSlide.value][0];
window.addEventListener('keyup', e => {
  switch (e.code) {
    case 'ArrowLeft':
      prevSlide();
      break;
    case 'ArrowRight':
      nextSlide();
      break;
  }
});

</script>

<template>
  <div id="slideshow">
    <div><h1>{{ data.userInfo.calling_name }}'s <span class="omnomcom">OmNomCom</span> Wrapped</h1></div>

    <div id="progress">
      <div v-for="(slide, i) in slides" class="bar">
        <div class="progress-bar"
             :class="{ playing: currentSlide === i && !touched, ended: currentSlide > i, tostart: currentSlide < i}"
             :style="{ animationDuration: slide[1]+'s'}" @animationend="nextSlide()"></div>
      </div>
    </div>

    <div style="width: min(calc(87vw), calc(calc(80vh) * 0.56)); aspect-ratio: 0.56" ref="slide">
      <Transition :name="transition">
        <component :is="slides[currentSlide][0]" :data="data" :time="slides[currentSlide][1]"/>
      </Transition>
      <div id="prev" @click="prevSlide()" @touchstart="touched = true" @touchend="touched = false"></div>
      <div id="next" @click="nextSlide()" @touchstart="touched = true" @touchend="touched = false"></div>
    </div>
    <button id="share" @click="shareSlide()"><FontAwesomeIcon icon="fa-solid fa-arrow-up-from-bracket"></FontAwesomeIcon> Share this slide</button>
  </div>
</template>

<style scoped>

#slideshow {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: .5em;
  padding-bottom: .5em;
}

#slideshow button {
  background: white;
  color: black;
  border: 0;
  border-radius: 1em;
  font-size: 1.5em;
  padding: .1em .5em;
  margin-bottom: .2em;
  cursor: pointer;
}

#slideshow div h1 {
  font-size: 1.8em;
}

#prev, #next {
  position: fixed;
  opacity: 0.2;
  top: 0;
  height: 100vh;
  width: 50vw;
}

#prev {
  left: 0;
}

#next {
  right: 0;
}

#progress {
  height: .5em;
  width: min(calc(87vw), calc(calc(87vh) * 0.56));
  display: flex;
  align-items: center;
}

.bar {
  flex-grow: 1;
  height: .3em;
  background: grey;
  margin: 0 .2em;
  border-radius: .1em;
}

.progress-bar {
  content: '';
  display: block;
  background: white;
  border-radius: .1em;
  height: .3em;
  width: 0;
  animation: progress-bar 10s linear forwards;
  animation-play-state: paused;
}

.progress-bar.playing {
  animation-play-state: running;
}

.progress-bar.ended {
  animation: none;
  width: 100%;
}

.progress-bar.tostart {
  animation: none;
  width: 0;
}

@keyframes progress-bar {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }

}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s ease;
}

.slide-left-enter-from,
.slide-right-leave-to {
  transform: translateX(calc(100vw));
}

.slide-left-leave-to,
.slide-right-enter-from {
  transform: translateX(calc(-100vw));
}
</style>
