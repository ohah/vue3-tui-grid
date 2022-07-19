import { HeaderRenderer, HeaderRendererProps } from "tui-grid/types/renderer";

export default class CustomColumnHeader implements HeaderRenderer{
  el: HTMLElement;
  constructor(props:HeaderRendererProps) {
    const columnInfo = props.columnInfo;
    const el = document.createElement('div');
    el.className = 'custom';
    el.textContent = `custom_${columnInfo.header}`;
    this.el = el;
  }

  getElement(): HTMLElement {
    return this.el;
  }

  mounted(parent: HTMLElement): void {
      
  }


  render(props: HeaderRendererProps): void {
        
  }
}