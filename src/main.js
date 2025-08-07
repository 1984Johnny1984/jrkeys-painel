import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // importa o roteador

const app = createApp(App)
app.use(router)              // liga o roteador na aplicação
app.mount('#app')            // monta no <div id="app">
