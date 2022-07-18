
<script lang="ts">
import { CellRendererProps } from "tui-grid/types/renderer";
import { useAttrs, useSlots, onMounted, defineComponent, PropType } from "vue";
export default defineComponent({
  name:"Cell",
})
</script>
<script setup lang="ts">
const props = defineProps({
  row: {
    type: Object as PropType<CellRendererProps>,
    required: true,
  },
});
const { row } = props;
const attr = useAttrs();
onMounted(()=>{
})
</script>

<template>
  <div>
    {{row.value}}
  </div>
</template>