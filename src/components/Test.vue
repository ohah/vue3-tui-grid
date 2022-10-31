<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name:"Test",
})
</script>
<script setup>
const props = defineProps({
  data: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div>
    {{props.data}}
  </div>
</template>
