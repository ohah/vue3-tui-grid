import { TuiGrid } from "@/components";
import type { App, Component, DefineComponent } from "vue";
import Grid from "tui-grid";
import { OptThemePresetNames, OptI18nData, OptPreset, OptColumn, OptGrid, OptHeader, OptColumnHeaderInfo } from "tui-grid/types/options";

interface Vue3OptGrid extends Partial<Omit<OptGrid, "el">> {
  header?: OptHeader & {
    columns?: OptColumnHeaderInfo[] & {
      component?: Component;
    }[]
  };
  
}

interface Vue3OptColumn extends OptColumn {
  component?: {
    editor?:Component
    renderer?:Component
  }
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

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    TuiGrid: typeof TuiGrid,
  }
}

export default {
  install: (app: App) => {
    app.component("tui-grid", TuiGrid);
  },
};

export { TuiGrid };
export type { TuiGridElement, Vue3OptColumn, Vue3OptGrid };