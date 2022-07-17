<script lang="ts">
import "tui-grid/dist/tui-grid.css";
import { defineComponent, onMounted, onUnmounted, PropType, ref } from 'vue'
import Grid from 'tui-grid';
import { GridEventListener, GridEventName, OptColumn, OptGrid, OptI18nData, OptPreset, OptRow, OptThemePresetNames } from 'tui-grid/types/options';
const presetTheme = ['default', 'striped', 'clean'];
const presetLanguage = ['en', 'ko'];
export default defineComponent({
	name: "TuiGrid",
})
</script>
<script lang="ts" setup>
import { useSlots, useAttrs } from 'vue'
import { VueCellRenderer, VueCellEditorRenderer } from '../Renderer';
type GridEventNameEmits<T> = { 
	(e: T, ...args:any) : void;
};
const emit = defineEmits<GridEventNameEmits<GridEventName>>()
const slots = useSlots();
const attrs = useAttrs();
const tuiGrid = ref<HTMLElement>();
const props = defineProps({
	data: {
		type: Array as PropType<OptRow[]>,
		required: true,
	},
	columns: {
		type: Array as PropType<OptColumn[]>,
		required: true,
	},
	options: {
		type: Object as PropType<OptGrid>,
		default() {
			return {};
		},
	},
});
let Instance: Grid|null = null;
onMounted(()=> {
	// console.log('slots', slots.default());
	if(slots) {
		const columns = props.columns.map(columns => {
			const slot = Object.keys(slots).find((slot) => slot === columns.name);
			if(slot) {
				console.log('slot', (slots[slot] as any)());
				(slots[slot] as any)().forEach((slot:any) => {
					console.log('text', slot.text, slot.el);
				});
			}
		});
	}
	const columns = props.columns.map(columns => {
		if(slots.editor) {
			slots.editor().forEach(editor => {
				if(editor.props?.name === columns.name) {
					// console.log('editor', editor);
					columns.editor = {
						type: VueCellEditorRenderer,
						options: {
							slot: editor,
						},
					}
				}
			});
		}
		if(slots.renderer) {
			console.log(slots.renderer());
			slots.renderer().forEach(renderer => {
				console.log('renderer.props?.name', renderer.props, renderer);
				if(renderer.props?.name === columns.name) {
					columns.renderer = {
						type: VueCellRenderer,
						options: {
							slot: renderer,
						},
					}
				}
			});
		}
		return columns;
		return {
			...columns,
			renderer: {
				...(columns.renderer as any) ,
				style: {
					fontWeight: '500',
				},
				type:VueCellRenderer,
				// ...slots[columns.name]?.()
			}
		}
	});
	const options = Object.assign(props.options || {}, attrs, {
		el: tuiGrid.value,
		data: props.data,
		columns: columns,
	}) as OptGrid;
	Instance = new Grid(options);
	for(const _eventName of Object.keys(attrs)) {
		const eventName = _eventName.substring(0, 2) === "on" ? _eventName.substring(2, _eventName.length).toLowerCase() as GridEventName : '';
		if(Instance && eventName !== '') {
			Instance.on(eventName, (...args:any) => {
				emit(eventName, ...args);
			});
		}
	}
});
defineExpose({
	get gridInstance() {
		return Instance;
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
		return typeof (Instance as any)[methodName] === 'function' ? (Instance as any)[methodName](...args) : null;
	},
});
onUnmounted(()=>{
	Object.keys(attrs).forEach((_eventName) => {
		const eventName = _eventName.substring(0, 2) === "on" ? _eventName.substring(2, _eventName.length).toLowerCase() as GridEventName : '';
		if(Instance && eventName !== '') {
			Instance.off(eventName);
		}
	});
	Instance?.destroy();
	Instance = null;
});
</script>

<template>
	<div ref="tuiGrid"></div>
</template>
