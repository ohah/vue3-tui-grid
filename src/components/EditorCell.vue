
<script lang="ts">
import { CellEditorProps } from "tui-grid/types/editor";
import { useAttrs, useSlots, onMounted, defineComponent, PropType, ref } from "vue";
export default defineComponent({
  name:"EditorCell",
})
</script>
<script setup lang="ts">
const props = defineProps({
  row: {
    type: Object as PropType<CellEditorProps>,
    required: true,
  },
});
const { row } = props;
const { grid } = row;
const Input = ref();
onMounted(()=>{
  Input.value.focus();
})
</script>

<template>
  <input class="tui-grid-content-text" type="text" ref="Input" :value="row.value" />
</template>