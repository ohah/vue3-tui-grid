H
<script lang="ts">
import { HeaderRendererProps } from "tui-grid/types/renderer";
import { defineComponent, PropType, ref } from "vue";
export default defineComponent({
  name:"HeaderCell",
})
</script>
<script setup lang="ts">
const props = defineProps({
  row: {
    type: Object as PropType<HeaderRendererProps>,
    required: true,
  },
});
const { row } = props;
const { grid } = row;
const ascending = ref<boolean>(false);
const sort = () => {
  const state = grid.getSortState();
  const columnState = state.columns.find(col => col.columnName === row.columnInfo.name);
  ascending.value = columnState?.ascending;
  grid.sort(row.columnInfo.name, columnState?.ascending ? false : true);
}
</script>

<template>
  <div>
    <span>{{row.columnInfo.name}}</span>
    <button @click="sort">{{ ascending ? "asc" : "desc"}}</button>
  </div>
</template>