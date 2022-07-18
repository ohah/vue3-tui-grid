## tui.grid
[https://github.com/nhn/tui.grid](https://github.com/nhn/tui.grid)
## Demo

[https://github.com/nhn/tui.grid/tree/master/packages/toast-ui.vue-grid](https://github.com/nhn/tui.grid/tree/master/packages/toast-ui.vue-grid)

## vue3-tui-grid
Vue 3 + TypeScript + Vite
## Install

```shell
npm install vue3-tui-grid
```

## How to use

#### main.ts(main.js)
```typescript
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import TuiGrid from "vue3-tui-grid"
import 'tui-grid/dist/tui-grid.css';
import "tui-date-picker/dist/tui-date-picker.css"; // use datepicker
createApp(App).use(TuiGrid).mount('#app')
```

#### use Vue
```html
<script setup lang="ts">
import { TuiGridElement } from "vue3-tui-grid"
import { OptColumn, OptRow } from 'tui-grid/types/options';
import { onMounted, ref } from 'vue';
const data = ref<OptRow[]>([
  {
    id: '10012',
    city: 'Seoul',
    country: 'South Korea'
  },
  {
    id: '10013',
    city: 'Tokyo',
    country: 'Japan'    
  },
  {
    id: '10014',
    city: 'London',
    country: 'England'
  },
  {
    id: '10015',
    city: 'Ljubljana',
    country: 'Slovenia'
  },
  {
    id: '10016',
    city: 'Reykjavik',
    country: 'Iceland'
  }
]);
const columns = ref<OptColumn[]>([
  {
    header: 'ID',
    name: 'id'
  },
  {
    header: 'CITY',
    name: 'city',
    editor: 'text'
  },
  {
    header: 'COUNTRY',
    name: 'country'
  }
]);
const GridTable = ref<TuiGridElement>();
onMounted(()=>{
  const grid = GridTable.value;
  grid?.applyTheme("striped");
  grid?.setLanguage("ko");
  const instance = grid?.gridInstance;
  instance.setWidth(500);
  grid.invoke("setWidth", 500);
});
</script>

<template>
  <tui-grid 
    ref="GridTable"
    :data="data"
    :columns="columns"
  >
  </tui-grid>
</template>
```

## License

MIT License

Copyright (c) 2022 ohah.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.