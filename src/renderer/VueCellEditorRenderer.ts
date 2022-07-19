import { ColumnInfo } from "tui-grid";
import { Component, h, VNode, createApp } from "vue";
import Vue from "vue";
import { CellEditorProps, CellEditor, GridRectForDropDownLayerPos } from "tui-grid/types/editor";

export interface VueCellEditorProps extends CellEditorProps {
  columnInfo: ColumnInfo & {
    editor:{
      type:VueCellEditorRenderer,
      options: Record<string, any> & {
        component:Component,
      }
    };
  };
}

export default class VueCellEditorRenderer implements CellEditor {
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