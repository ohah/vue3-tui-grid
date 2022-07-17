<script setup lang="ts">
import { TuiGridElement } from '@/TuiGridPlugin';
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
  const instance = GridTable.value;
  instance?.applyTheme("striped");
  GridTable.value?.setLanguage("ko");
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

<style scoped>
</style>