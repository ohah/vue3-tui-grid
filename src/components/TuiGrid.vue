<script lang="ts">
import "tui-grid/dist/tui-grid.css";
import "tui-date-picker/dist/tui-date-picker.css";
import { defineComponent, onMounted, onUnmounted, PropType, ref } from 'vue'
import Grid from 'tui-grid';
import { GridEventName, OptGrid, OptI18nData, OptPreset, OptRow, OptThemePresetNames } from 'tui-grid/types/options';
import { Vue3OptColumn } from '@/TuiGridPlugin';
export default defineComponent({
	name: "TuiGrid",
})
</script>
<script lang="ts" setup>
import { useAttrs } from 'vue'
import { VueCellEditorRenderer, VueCellRenderer } from "@/renderer";
type GridEventNameEmits<T> = { 
	(e: T, ...args:any) : void;
};
const emit = defineEmits<GridEventNameEmits<GridEventName>>()
const attrs = useAttrs();
const tuiGrid = ref<HTMLElement>();
const props = defineProps({
	data: {
		type: Array as PropType<OptRow[]>,
		required: true,
	},
	columns: {
		type: Array as PropType<Vue3OptColumn[]>,
		required: true,
	},
	options: {
		type: Object as PropType<OptGrid>,
		default() {
			return {};
		},
	},
});
const Instance = ref<Grid|null>(null);
onMounted(()=> {
	const columns = props.columns.map(columns => {
		if(columns.component?.renderer) {
			columns.renderer = {
				type: VueCellRenderer,
				options: {
					component: columns.component.renderer
				}
			}
		}
		if(columns.component?.editor) {
			columns.editor = {
				type: VueCellEditorRenderer,
				options: {
					component: columns.component.editor,
				},
			}
		}
		return columns;
	});
	const options = Object.assign(props.options || {}, attrs, {
		...props.options,
		el: tuiGrid.value,
		data: props.data,
		columns: columns,
	}) as OptGrid;
	Instance.value = new Grid(options);
	for(const _eventName of Object.keys(attrs)) {
		const eventName = _eventName.substring(0, 2) === "on" ? _eventName.substring(2, _eventName.length).charAt(0).toLocaleLowerCase() + _eventName.substring(2, _eventName.length).slice(1) as GridEventName : '';
		if(Instance.value && eventName !== '') {
			Instance.value.on(eventName, (...args:any) => {
				emit(eventName, ...args);
			});
		}
	}
});
defineExpose({
	get gridInstance() {
		return Instance.value;
	},
	get rootElement() {
		return tuiGrid.value;
	},
	setLanguage(localeCode: string, data?: OptI18nData) {
		if(Instance) {
			Grid.setLanguage(localeCode, data);
		}
	},
	applyTheme(presetName:OptThemePresetNames, extOptions?:OptPreset): void {
		if(Instance) {
			Grid.applyTheme(presetName, extOptions);
		}
	},
	invoke: (methodName:string, ...args:any) => {
		return typeof (Instance.value as any)[methodName] === 'function' ? (Instance.value as any)[methodName](...args) : null;
	},
});
onUnmounted(()=>{
	Object.keys(attrs).forEach((_eventName) => {
		const eventName = _eventName.substring(0, 2) === "on" ? _eventName.substring(2, _eventName.length).toLowerCase() as GridEventName : '';
		if(Instance.value && eventName !== '') {
			Instance.value.off(eventName);
		}
	});
	Instance.value?.destroy();
	Instance.value = null;
});
</script>

<template>
	<div ref="tuiGrid"></div>
</template>
