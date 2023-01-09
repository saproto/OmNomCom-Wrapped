import { createApp, defineComponent } from 'vue'
import App from './App.vue'

import {library} from "@fortawesome/fontawesome-svg-core";
import {faArrowUpFromBracket} from "@fortawesome/free-solid-svg-icons";

library.add(faArrowUpFromBracket);


import './assets/main.css'

createApp(App).mount('#app')
