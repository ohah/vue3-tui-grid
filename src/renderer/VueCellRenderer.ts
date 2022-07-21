import { ColumnInfo } from "tui-grid";
import { CellRenderer, CellRendererProps } from "tui-grid/types/renderer";
import { Component, h, VNode, createApp } from "vue";
import Vue from "vue";

export interface VueCellProps extends CellRendererProps {
  columnInfo: ColumnInfo & {
    renderer:{
      type:VueCellRenderer,
      options: Record<string, any> & {
        component?:Component,
      }
    };
  };
}
export default class VueCellRenderer implements CellRenderer {
  el: HTMLElement;
  VNode:Vue.VNode<Vue.RendererNode, Vue.RendererElement, {
    [key: string]: any;
  }>
  app: Vue.App;
  constructor(props:CellRendererProps) {
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