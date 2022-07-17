import { createApp } from 'vue'
import App from './App.vue'
import TuiGridPlugin from './TuiGridPlugin'

const app = createApp(App);
app.use(TuiGridPlugin).mount('#app')

