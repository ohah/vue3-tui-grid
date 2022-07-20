import { HeaderRenderer, HeaderRendererProps } from "tui-grid/types/renderer";
import { Component, h, VNode, createApp } from "vue";
import Vue from "vue";
import VueCellRenderer from "./VueCellRenderer";
import { ColumnInfo } from "tui-grid/types/store/column";
export interface HeaderCellProps extends HeaderRendererProps {
  columnInfo: ColumnInfo & {
    renderer:{
      type:VueCellRenderer,
      options: Record<string, any> & {
        header?:Component,
      }
    };
  };
}
export default class VueHeaderRenderer implements HeaderRenderer{
  el: HTMLElement;
  VNode:Vue.VNode<Vue.RendererNode, Vue.RendererElement, {
    [key: string]: any;
  }>
  app: Vue.App;
  constructor(props:HeaderRendererProps, options:any) {
    this.el = document.createElement('div');
    const columnInfo = props.columnInfo as HeaderCellProps["columnInfo"];
    if(columnInfo.renderer.options.header) {
      const { header } = columnInfo.renderer.options
      this.VNode = h(header as VNode, {
        row: props,
      });
      this.app = createApp(this.VNode);
      this.app.mount(this.el);
    }
    this.render(props);
  }

  getElement(): HTMLElement {
    return this.el;
  }

  mounted(parent: HTMLElement): void {

  }


  render(props: HeaderRendererProps): void {
        
  }
}