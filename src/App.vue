<script setup lang="ts">
import { OptColumn } from 'tui-grid/types/options';
import { CellRendererProps } from 'tui-grid/types/renderer';
import { onMounted, ref } from 'vue';
import { TuiGridElement } from './TuiGrid';
import { VueCellRenderer } from "./Renderer"
// import TuiGrid from './TuiGrid.vue';
const data = ref([
  // for rowData prop
  {
    name: 'test',
    artist: 'Birdy'
  },
  {
    name: 'X',
    artist: 'Ed Sheeran'
  }
]);
const columns = ref<OptColumn[]>([
  {
    header: 'Name',
    name: 'name',
    sortable: true,
  },
  {
    header: 'Artist',
    name: 'artist',
    sortable: true,
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
    @selection="check"
    @click="sort"
    @dblclick="sort"
  >
  </tui-grid>
</template>

<style scoped>
.w-100{width:100%}
</style>