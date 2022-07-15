import { CellEditor, CellEditorProps, GridRectForDropDownLayerPos } from "tui-grid/types/editor";
import { CellRenderer, CellRendererClass, CellRendererProps } from "tui-grid/types/renderer";
import { onMounted, ref, Component, VueElement, defineComponent, resolveComponent, h, createApp, SetupContext, useSlots } from 'vue';
import Vue from 'vue';
import { ColumnInfo } from "tui-grid";
interface VueCellProps extends CellRendererProps {
  columnInfo: ColumnInfo & {
    renderer:{
      type:VueCellRenderer,
      options: Record<string, any> & {
        slot:SetupContext['slots']
      }
    };
  };
}
export class VueCellRenderer implements CellRenderer {
  el: HTMLElement;
  VNode:Vue.VNode<Vue.RendererNode, Vue.RendererElement, {
    [key: string]: any;
  }>
  constructor(params:CellRendererProps, options:any) {
    const { slot } = (params as VueCellProps).columnInfo.renderer.options;
    console.log('cellrenderProps', slot);
    this.el = document.createElement('div');
    this.VNode = h(defineComponent({
      render() {
        return h("", {}, slot);
      },
    }));
    // this.render(params);
    const app = createApp(this.VNode);
    app.mount(this.el);
    console.log('conttext', this.VNode.appContext);
  }
  
  getElement() {
    return this.el;
  }
  
  focused() {
    console.log('focused');
  }

  mounted(parent: HTMLElement) {
    // console.log('mounted', parent);
  }

  render(params:CellRendererProps) {
    // console.log(this.el);
    // (this.el as any).value = params.value;
    // console.log('test', component);
  }
  
  beforeDestory() {

  }
}

interface VueCellEditorProps extends CellEditorProps {
  columnInfo: ColumnInfo & {
    editor:{
      type:VueCellEditorRenderer,
      options: Record<string, any> & {
        slot:SetupContext['slots']
      }
    };
  };
}

export class VueCellEditorRenderer implements CellEditor {
  el:HTMLElement
  isMounted?: boolean;
  VNode:Vue.VNode<Vue.RendererNode, Vue.RendererElement, {
    [key: string]: any;
  }>
  constructor(props:CellEditorProps) {
    this.el = document.createElement('div');
    const params = props as VueCellEditorProps;
    const { slot } = params.columnInfo.editor.options;
    // console.log('slot', params.columnInfo.editor.options, slot);
    this.VNode = h(defineComponent({
      render() {
        return h("div", {}, slot);
      },
    }));
    const app = createApp(this.VNode);
    // console.log('VueCellEditorRenderer', props);
    app.mount(this.el);
    this.isMounted = false;
  }

  getElement() {
    console.log('?');
    return this.el;
  }

  getValue() {
    console.log('getValue', this.VNode);
    return this.el.querySelector("textarea, input, select") ? (this.el.querySelector("textarea, input, select") as any).value : "";
    return (this.el as HTMLInputElement).value;;
    if(this.el.tagName === "INPUT") {
      return (this.el as HTMLInputElement).value;
    } else {
      return this.el.innerText;
    }
  }

  mounted() {
    console.log('실행');
    this.el.querySelector("textarea, input, select") ? (this.el.querySelector("textarea, input, select") as any).focus() : "";
  }

  beforeDestroy() {

  }

  moveDropdownLayer(gridRect:GridRectForDropDownLayerPos) {
    console.log('moveDropdownLayer', gridRect);
  }
}
