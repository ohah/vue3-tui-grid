<script setup lang="ts">
import { TuiGridElement, Vue3OptColumn, Vue3OptGrid } from '@/TuiGridPlugin';
import { OptRow } from 'tui-grid/types/options';
import { onMounted, ref } from 'vue';
import { Cell, EditorCell, HeaderCell } from "./components";
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

const rowHeaders = ref([
  {
    type: 'rowNum',
  },
  {
    type: 'checkbox',
    header: `
          <label for="all-checkbox" class="checkbox">
            <input type="checkbox" id="all-checkbox" class="hidden-input" name="_checked" />
            <span class="custom-input"></span>
          </label>
        `,
  },
]);

const columns = ref<Vue3OptColumn[]>([
  {
    header: 'ID',
    name: 'id',
    component: {
      renderer: Cell,
    },
    sortable: true,
  },
  {
    header: 'CITY',
    name: 'city',
    editor: {
      type: "datePicker"
    },
    validation: {
      dataType: 'number'
    }
  },
  {
    header: 'COUNTRY',
    name: 'country',
    component: {
      editor: EditorCell,
    },
    sortable: true,
  }
]);
const options = ref<Vue3OptGrid>({
  draggable:true,
  summary:{
    position:'bottom',
    height:30,
    columnContent:{
      city:{
        template() {
          return "<div><strong>test</strong>ㅁㄴㅇㄹ</div>";
        },
        useAutoSummary:true,
      }
    }
  },
  header:{
    columns:[{
      name:'id',
      component:HeaderCell,
    }]
  },
})
const GridTable = ref<TuiGridElement>();
onMounted(() => {
  const grid = GridTable.value;
  grid?.applyTheme("striped");
  grid?.setLanguage("ko");
  const instance = grid?.gridInstance;
  // instance.setWidth("500px");
  // grid.invoke("setWidth", "100%");
});
</script>

<template>
  <tui-grid ref="GridTable" :data="data" :columns="columns" :options="options" />
</template>