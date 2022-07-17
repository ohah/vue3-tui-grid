import { createApp } from 'vue'
import App from './App.vue'
import TuiGrid from './TuiGridPlugin'

const app = createApp(App);
app.use(TuiGrid).mount('#app')