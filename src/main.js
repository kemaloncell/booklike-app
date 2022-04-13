import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {appAxios} from '@/utils/appAxios'
import store from './store'

import "./assets/style.css"
import appHeader from "@/components/shared/appHeader.vue"
import appBookmarkList from "@/components/shared/appBookmarkList";

const app = createApp(App)
app.use(router)
app.use(store)
app.component('appHeader', appHeader)
app.component('appBookmarkList', appBookmarkList)
app.config.globalProperties.$appAxios = appAxios
app.mount('#app')

