<script setup>
import {ref} from 'vue';
import {login, callback, protoApi, isLoggedIn} from "@/helpers/oauth";
import SlideShow from "@/components/SlideShow.vue";
import {prepareStats} from "@/helpers/stats";

const data = ref({});
const loaded = ref(false);
const steps = 5;
const currentStep = ref(0);
const loggedIn = ref(undefined);
const loadData = async () => {
  data.value.wrapped = await protoApi('wrapped');
  currentStep.value++;
  data.value.stats = await prepareStats(data.value.wrapped, data.value.wrapped.purchases);
  currentStep.value++;
  await new Promise(resolve => setTimeout(resolve, 1000));
  loaded.value = true;
}
callback().then(() => {
  isLoggedIn().then(result => {
    if (result) {
      loggedIn.value = true;
      loadData()
    } else {
      loggedIn.value = false;
    }
  });
})


</script>

<template>
  <Transition>
    <main v-if="loggedIn && loaded">
      <SlideShow :data="data"/>
    </main>
    <main id="welcome" v-else>
      <h1>Welcome to <span class="omnomcom">OmNomCom</span> Wrapped</h1>
      <div id="loader" v-if="loggedIn">
        <div class="bar">
          <div class="progress-bar" :style="{ width: currentStep/steps*100+'%'}"></div>
        </div>
        <div>
          Loading:
          <span id="loading"></span>
        </div>
      </div>
      <div v-else-if="loggedIn === false">
        <button @click="login">Login using your Proto Account</button>
      </div>
    </main>
  </Transition>
</template>

<style scoped>

#welcome {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  gap: 2em;
  font-size: min(1em, 2vw);
}

#welcome h1 {
  font-size: 3em;
}

button {
  font-size: 1.5em;
  color: white;
  padding: .5em;
  background: rgb(50, 50, 255);
  border: 0;
  border-radius: .5em;
  cursor: pointer;
  transition: .2s;
}

button:hover {
  box-shadow: rgba(0, 0, 255, .5) 0 0 1em .5em;
}

#loader {
  font-size: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bar {
  width: 15em;
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
  transition: width .5s;
}

#loading:after {
  animation: loading 10s linear infinite;
  animation-delay: 2s;
  content: 'Collecting your data';
}

@keyframes loading {
  0% {
    content: 'Eating your data'
  }
  15% {
    content: 'Placing some cookies'
  }
  30% {
    content: 'Eating cookie warning'
  }
  45% {
    content: 'Consuming cookie policy'
  }
  60% {
    content: 'Thanking Beheer'
  }
  75% {
    content: 'Cooooookiiiieeeees!'
  }
  90% {
    content: 'Recollecting your data'
  }
  100% {
    content: 'Eating your data'
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity .5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
