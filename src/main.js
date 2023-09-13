import { createApp } from 'vue'

import components from '@/components/UI'
import App from './App.vue'

import {createPinia} from "pinia";
import './assets/main.css'

const app = createApp(App);

components.forEach(component => {
    app.component(component.name, component)
})

app.use(createPinia()).mount('#app')