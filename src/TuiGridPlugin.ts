import { TuiGrid } from "@/components";
import type { App, DefineComponent } from "vue";
import Grid from "tui-grid";
import { OptThemePresetNames, OptI18nData, OptPreset, OptColumn } from "tui-grid/types/options";
import { VueCellRenderer } from "@/Renderer";

interface Vue3OptColumn extends OptColumn {
  vue3renderer?: (row:any) => typeof VueCellRenderer
}

interface TuiGridElement extends DefineComponent {
  /**
   * @param methodName https://nhn.github.io/tui.grid/latest
   * @param args 
   */
  invoke(methodName: string, ...args: any): void;
  /**
   * @param localeCode "ko" | "en"
   */
  setLanguage(localeCode: string, data?: OptI18nData): void;
  /**
   * applyTheme
   * @param theme "default" | "striped" | "clean"
   */
  applyTheme(presetName: OptThemePresetNames, extOptions?: OptPreset): void;
  /**
   * Grid
   */
  gridInstance: Grid;
  /**
   * rootElement
   */
  rootElement: HTMLElement;
}

export default {
  install: (app: App) => {
    app.component("tui-grid", TuiGrid);
  },
};

export { TuiGrid };
export type { TuiGridElement, Vue3OptColumn }