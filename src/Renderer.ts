import { CellEditor, CellEditorProps, GridRectForDropDownLayerPos } from "tui-grid/types/editor";
import { CellRenderer, CellRendererProps } from "tui-grid/types/renderer";
import { Component, h, createApp, VNode } from 'vue';
import Vue from 'vue';
import { ColumnInfo } from "tui-grid";
interface VueCellProps extends CellRendererProps {
  columnInfo: ColumnInfo & {
    renderer:{
      type:VueCellRenderer,
      options: Record<string, any> & {
        component?:Component,
      }
    };
  };
}
export class VueCellRenderer implements CellRenderer {
  el: HTMLElement;
  VNode:Vue.VNode<Vue.RendererNode, Vue.RendererElement, {
    [key: string]: any;
  }>
  app: Vue.App;
  constructor(props:CellRendererProps) {
    // const { slot } = (props as VueCellProps).columnInfo.renderer.options;
    this.el = document.createElement('div');
    const { columnInfo } = props as VueCellProps;
    if(columnInfo.renderer.options.component) {
      const { component } = (props as VueCellProps).columnInfo.renderer.options
      this.VNode = h(component as VNode, {
        row: props,
      });
      this.app = createApp(this.VNode);
      this.app.mount(this.el);
    }
    this.render(props);
    // console.log('conttext', this.VNode.appContext);
  }
  
  getElement() {
    return this.el;
  }
  
  focused() {
  }

  mounted(parent: HTMLElement) {
  }

  render(props:CellRendererProps) {
    
  }
  
  beforeDestory() {
    this.app = null;
  }
}

interface VueCellEditorProps extends CellEditorProps {
  columnInfo: ColumnInfo & {
    editor:{
      type:VueCellEditorRenderer,
      options: Record<string, any> & {
        component:Component,
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
  app: Vue.App;
  props:CellEditorProps
  constructor(props:CellEditorProps) {
    this.el = document.createElement('div');
    this.el.className = "tui-grid-cell tui-grid-cell-content tui-grid-cell-editable";
    this.props = props;
    this.isMounted = false;
  }

  getElement() {    
    return this.el;
  }

  getValue() {
    return this.el.querySelector("textarea, input, select") ? (this.el.querySelector("textarea, input, select") as any).value : "";
  }

  mounted() {
    const { columnInfo } = this.props as VueCellEditorProps;
    if(columnInfo.editor.options.component) {
      const { component } = (this.props as VueCellEditorProps).columnInfo.editor.options
      this.VNode = h(component as VNode, {
        row: this.props,
      });
      this.app = createApp(this.VNode);
      this.app.mount(this.el);
    }
  }

  beforeDestroy() {
    this.app = null;
  }

  moveDropdownLayer(gridRect:GridRectForDropDownLayerPos) {
  }
}
